'use client'

import React, { useState } from 'react'
import { Camera } from 'lucide-react'
import Image from 'next/image'
import * as tf from '@tensorflow/tfjs'

interface FashionCategory {
  id: number;
  name: string;
  description: string;
}

interface StyleResult {
  category: string;
  confidence: number;
}

const FASHION_CATEGORIES: FashionCategory[] = [
  { id: 1, name: 'Bags', description: 'Handbags, backpacks, accessories' },
  { id: 2, name: 'Bottomwear', description: 'Pants, skirts, shorts collection' },
  { id: 3, name: 'Dress', description: 'Casual, formal, party dresses' },
  { id: 4, name: 'Headwear', description: 'Hats, caps, hair accessories' },
  { id: 5, name: 'Shoes', description: 'Sneakers, heels, boots styles' },
  { id: 6, name: 'Topwear', description: 'Shirts, blouses, jackets range' },
  { id: 7, name: 'Watches', description: 'Classic, smart, luxury watches' }
];

export default function ImageClassifier() {
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<StyleResult | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target?.result as string);
      reader.readAsDataURL(file);
      setPrediction(null);
    }
  };

  const loadModel = async () => {
    try {
      const loadedModel = await tf.loadGraphModel('/model/model.json');
      setModel(loadedModel);
      return loadedModel;
    } catch (error) {
      console.error('Error loading model:', error);
      return null;
    }
  };


  // Modifikasi bagian proses prediksi
const analyzePicture = async () => {
    if (!imageUrl) return;

    try {
        setIsAnalyzing(true);
        const loadedModel = model || await loadModel();
        if (!loadedModel) {
            throw new Error('Failed to load model');
        }

        const img = document.createElement('img');
        img.src = imageUrl;
        await new Promise((resolve) => { img.onload = resolve; });

        // Preprocess image
        const tensor = tf.tidy(() => {
            return tf.browser.fromPixels(img)
                .resizeBilinear([128, 128])
                .expandDims()
                .toFloat()
                .div(255.0);
        });

        // Get prediction
        const predictions = await loadedModel.predict(tensor) as tf.Tensor;
        const probabilities = tf.softmax(predictions);
        const dataArray = await probabilities.data();

        // Get max probability dan batasi ke range 0-100
        const rawProbability = Math.max(...dataArray);
        const classIndex = dataArray.indexOf(rawProbability);
        
        // Normalisasi confidence ke range 0-100
        const confidence = Math.min(100, parseFloat((rawProbability * 100).toFixed(2)));

        setPrediction({
            category: FASHION_CATEGORIES[classIndex].name,
            confidence: confidence  // Ini akan selalu 0-100
        });

        // Cleanup
        tensor.dispose();
        predictions.dispose();
        probabilities.dispose();

    } catch (error) {
        console.error('Error analyzing image:', error);
    } finally {
        setIsAnalyzing(false);
    }
};
  return (
    <div className="mt-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6">
        <div className="space-y-4">
          {/* Image Upload Area */}
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer block"
            >
              {imageUrl ? (
                <div className="relative h-64 w-full">
                  <Image
                    src={imageUrl}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="text-center p-8">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Click to upload image</p>
                </div>
              )}
            </label>
          </div>

          {/* Analyze Button */}
          <button
            onClick={analyzePicture}
            disabled={!imageUrl || isAnalyzing}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
              !imageUrl || isAnalyzing
                ? 'bg-gray-400'
                : 'bg-gradient-to-r from-[#E43D12] to-[#D6536D] hover:opacity-90'
            }`}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Style'}
          </button>

          {/* Results Display */}
          {prediction && (
            <div className="mt-4 p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Style Analysis Results</h3>
              <p>Style Category: {prediction.category}</p>
              <p>Description: {FASHION_CATEGORIES.find(cat => cat.name === prediction.category)?.description}</p>
              <p>AI Confidence: {prediction.confidence.toFixed(2)}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}