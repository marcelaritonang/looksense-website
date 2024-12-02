import { NextResponse } from 'next/server';
import * as tf from '@tensorflow/tfjs';

const MODEL_PATH = '/model/model.json';
const classes = [
    "Bags",
    "Bottomwear",
    "Dress",
    "Headwear",
    "Shoes",
    "Topwear",
    "Watches"
];

let model: tf.GraphModel | null = null;

async function loadModel() {
    try {
        if (!model) {
            model = await tf.loadGraphModel(MODEL_PATH);
        }
        return model;
    } catch (error) {
        console.error('Error loading model:', error);
        throw new Error('Failed to load model');
    }
}

function normalizeConfidence(value: number): number {
    return Math.min(100, Math.max(0, parseFloat((value * 100).toFixed(2))));
}

function imageToTensor(imageData: ArrayBuffer): Promise<tf.Tensor> {
    const image = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const blob = new Blob([imageData]);
    const url = URL.createObjectURL(blob);

    return new Promise<tf.Tensor>((resolve, reject) => {
        image.onload = () => {
            canvas.width = 128;
            canvas.height = 128;
            ctx?.drawImage(image, 0, 0, 128, 128);
            const imageData = ctx?.getImageData(0, 0, 128, 128);
            const tensor = tf.browser.fromPixels(imageData!);
            resolve(tensor);
        };
        image.onerror = (err) => reject(err);
        image.src = url;
    });
}

export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('image') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No image provided' },
                { status: 400 }
            );
        }

        const buffer = await file.arrayBuffer();
        const tensor = await imageToTensor(buffer);

        const preprocessed = tf.tidy(() => {
            return tensor
                .expandDims()
                .toFloat()
                .div(255.0);
        });

        const loadedModel = await loadModel();
        const predictions = await loadedModel.predict(preprocessed) as tf.Tensor;

        const softmaxPreds = tf.softmax(predictions);
        const dataArray = await softmaxPreds.data();

        const maxProbability = Math.max(...dataArray);
        const classIndex = dataArray.indexOf(maxProbability);

        const normalizedProbabilities = Array.from(dataArray).map(prob =>
            normalizeConfidence(prob)
        );

        const results = {
            class: classes[classIndex],
            confidence: normalizeConfidence(maxProbability),
            probabilities: classes.map((cls, idx) => ({
                class: cls,
                probability: normalizedProbabilities[idx]
            }))
        };

        tensor.dispose();
        preprocessed.dispose();
        predictions.dispose();
        softmaxPreds.dispose();

        return NextResponse.json(results);

    } catch (error) {
        console.error('Prediction error:', error);
        return NextResponse.json(
            { error: 'Failed to process image' },
            { status: 500 }
        );
    }
}
