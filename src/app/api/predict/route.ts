import { NextResponse } from 'next/server'
import * as tf from '@tensorflow/tfjs-node'
import { promises as fs } from 'fs'
import path from 'path'

const MODEL_PATH = 'public/model/model.json'
const classes = [
    "Bags",
    "Bottomwear",
    "Dress",
    "Headwear",
    "Shoes",
    "Topwear",
    "Watches"
]

let model: tf.GraphModel | null = null

async function loadModel() {
    try {
        if (!model) {
            model = await tf.loadGraphModel(`file://${path.resolve(MODEL_PATH)}`)
        }
        return model
    } catch (error) {
        console.error('Error loading model:', error)
        throw new Error('Failed to load model')
    }
}

function normalizeConfidence(value: number): number {
    // Memastikan confidence dalam range 0-100 dengan 2 desimal
    return Math.min(100, Math.max(0, parseFloat((value * 100).toFixed(2))));
}

export async function POST(request: Request) {
    try {
        const data = await request.formData()
        const file: File | null = data.get('image') as File

        if (!file) {
            return NextResponse.json(
                { error: 'No image provided' },
                { status: 400 }
            )
        }

        // Load model if not loaded
        const loadedModel = await loadModel()

        // Convert image to tensor
        const buffer = await file.arrayBuffer()
        const imageData = new Uint8Array(buffer)
        const tensor = tf.node.decodeImage(imageData)
        
        // Preprocess image
        const preprocessed = tf.tidy(() => {
            return tensor
                .resizeBilinear([128, 128])
                .expandDims()
                .toFloat()
                .div(255.0)
        })

        // Get prediction
        const predictions = await loadedModel.predict(preprocessed) as tf.Tensor
        
        // Apply softmax normalization
        const softmaxPreds = tf.softmax(predictions)
        const dataArray = await softmaxPreds.data()

        // Get highest probability class
        const maxProbability = Math.max(...dataArray)
        const classIndex = dataArray.indexOf(maxProbability)

        // Normalize probabilities
        const normalizedProbabilities = Array.from(dataArray).map(prob => 
            normalizeConfidence(prob)
        )

        // Get results
        const results = {
            class: classes[classIndex],
            confidence: normalizeConfidence(maxProbability),
            probabilities: classes.map((cls, idx) => ({
                class: cls,
                probability: normalizedProbabilities[idx]
            }))
        }

        // Cleanup
        tensor.dispose()
        preprocessed.dispose()
        predictions.dispose()
        softmaxPreds.dispose()

        return NextResponse.json(results)

    } catch (error) {
        console.error('Prediction error:', error)
        return NextResponse.json(
            { error: 'Failed to process image' },
            { status: 500 }
        )
    }
}