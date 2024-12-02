import * as tf from '@tensorflow/tfjs';

export class FashionClassifier {
  private model: tf.GraphModel | null = null;

  async loadModel() {
    try {
      this.model = await tf.loadGraphModel('/model_1/model.json');
      console.log('Model loaded successfully');
      return true;
    } catch (error) {
      console.error('Error loading model:', error);
      return false;
    }
  }

  private preprocessImage(image: HTMLImageElement): tf.Tensor {
    return tf.tidy(() => {
      // Convert to tensor
      const tensor = tf.browser.fromPixels(image, 3);
      
      // Resize
      const resized = tf.image.resizeBilinear(tensor, [177, 177]);
      
      // Convert to float32 and normalize using same values as PyTorch
      const normalized = resized.toFloat();
      
      // Normalize using same means and stds as training
      const means = tf.tensor([0.485, 0.456, 0.406]).reshape([1, 1, 3]);
      const stds = tf.tensor([0.229, 0.224, 0.225]).reshape([1, 1, 3]);
      
      const scaled = normalized.div(255.0);  // Scale to [0,1]
      const meanSubtracted = scaled.sub(means);  // Subtract means
      const standardized = meanSubtracted.div(stds);   // Divide by stds
      
      // Add batch dimension
      return standardized.expandDims(0);
    });
  }

  async predict(image: HTMLImageElement) {
    if (!this.model) {
      throw new Error('Model not loaded');
    }

    // Initialize as definitely not null
    const inputTensor = this.preprocessImage(image);
    
    try {
      // Get prediction
      const predictions = this.model.predict(inputTensor) as tf.Tensor;
      const data = await predictions.data();
      
      // Apply softmax
      const softmax = tf.tidy(() => tf.softmax(tf.tensor(data)));
      const probabilities = await softmax.data();

      // Get max probability and index
      const maxProbability = Math.max(...Array.from(probabilities));
      const classIndex = Array.from(probabilities).indexOf(maxProbability);

      // Categories - match exactly with training
      const categories = [
        "Bags",
        "Bottom wear",
        "Dress",
        "Headwear",
        "Shoes",
        "Topwear",
        "Watches"
      ];

      // Format confidence
      const confidence = parseFloat(maxProbability.toFixed(2));

      // Log predictions for debugging
      console.log('Predictions:', {
        probabilities: Array.from(probabilities),
        maxProbability,
        classIndex,
        category: categories[classIndex],
        confidence
      });

      // Cleanup
      softmax.dispose();

      return {
        category: categories[classIndex],
        confidence: confidence
      };

    } finally {
      // Cleanup
      inputTensor.dispose();
    }
  }
}