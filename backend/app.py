from flask import Flask, request, jsonify
import tensorflow as tf
from flask_cors import CORS
import numpy as np
import pickle
import cv2

app = Flask(__name__)
CORS(app)

# Load models
bloodgroup_model = tf.keras.models.load_model('model/bloodgroup_fingerprint_model-3.keras')
fingerprint_model = tf.keras.models.load_model('model/fingerprint_model.keras')

# Load encoders
with open('model/label_encoder-2.pkl', 'rb') as f:
    bloodgroup_encoder = pickle.load(f)

with open('model/label_encoder.pkl', 'rb') as f:
    fingerprint_encoder = pickle.load(f)

# Utility function to preprocess image
def preprocess_image(image_bytes, target_size=(128, 128)):
    # Convert bytes to a NumPy array
    file_bytes = np.asarray(bytearray(image_bytes), dtype=np.uint8)
    
    # Decode the image as grayscale
    image = cv2.imdecode(file_bytes, cv2.IMREAD_GRAYSCALE)
    
    # Resize the image
    image = cv2.resize(image, target_size)
    
    # Normalize to [0, 1]
    image = image / 255.0

    # Expand dimensions to match model input shape (batch, height, width, channels)
    image = np.expand_dims(image, axis=-1)  # Add channel dimension
    image = np.expand_dims(image, axis=0)   # Add batch dimension
    return image

# def preprocess_image(image_bytes, target_size=(128, 128)):
#     image = Image.open(io.BytesIO(image_bytes)).convert('L')  # Convert to grayscale (1 channel)
#     image = image.resize(target_size)
#     image_array = np.array(image) / 255.0  # Normalize if needed
#     return np.expand_dims(image_array, axis=0)  # Add batch dimension




@app.route('/')
def index():
    return "AI Model API is running."

@app.route('/predict_bloodgroup', methods=['POST'])
def predict_bloodgroup():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400

        image_file = request.files['image']
        image_bytes = image_file.read()
        input_data = preprocess_image(image_bytes)

        prediction = bloodgroup_model.predict(input_data)
        label = bloodgroup_encoder.inverse_transform([np.argmax(prediction)])

        return jsonify({'prediction': label[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/predict_fingerprint', methods=['POST'])
def predict_fingerprint():
    try:
        bloodgroup_model.summary()
        fingerprint_model.summary()
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400

        image_file = request.files['image']
        image_bytes = image_file.read()
        input_data = preprocess_image(image_bytes)

        prediction = fingerprint_model.predict(input_data)
        label = fingerprint_encoder.inverse_transform([np.argmax(prediction)])

        return jsonify({'prediction': label[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
