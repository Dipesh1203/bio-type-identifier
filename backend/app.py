from flask import Flask, request, jsonify
import tensorflow as tf
from flask_cors import CORS
import numpy as np
import pickle
import cv2
from PIL import Image
import io
import os
from sklearn.metrics.pairwise import cosine_similarity


app = Flask(__name__)
CORS(app)

# Load models
# fingerprint_validator_model = tf.keras.models.load_model('model/fingerprint_validator_model.h5')
bloodgroup_model = tf.keras.models.load_model('model/bloodgroup_fingerprint_model-3.keras')
fingerprint_model = tf.keras.models.load_model('model/fingerprint_model.keras')

# Load encoders
with open('model/label_encoder-2.pkl', 'rb') as f:
    bloodgroup_encoder = pickle.load(f)

with open('model/label_encoder.pkl', 'rb') as f:
    fingerprint_encoder = pickle.load(f)

# Utility function to preprocess image
# def preprocess_image(image_bytes, target_size=(128, 128)):
#     # Convert bytes to a NumPy array
#     file_bytes = np.asarray(bytearray(image_bytes), dtype=np.uint8)
    
#     # Decode the image as grayscale
#     image = cv2.imdecode(file_bytes, cv2.IMREAD_GRAYSCALE)
    
#     # Resize the image
#     image = cv2.resize(image, target_size)
    
#     # Normalize to [0, 1]
#     image = image / 255.0

#     # Expand dimensions to match model input shape (batch, height, width, channels)
#     image = np.expand_dims(image, axis=-1)  # Add channel dimension
#     image = np.expand_dims(image, axis=0)   # Add batch dimension
#     return image


def preprocess_image(image_bytes, target_size=(128, 128), to_grayscale=True):
    try:
        # Load image from bytes
        image = Image.open(io.BytesIO(image_bytes))
        print(f"✅ Original image format: {image.format}, size: {image.size}, mode: {image.mode}")

        # Convert to grayscale or RGB
        if to_grayscale:
            image = image.convert('L')
            print("🎨 Converted to grayscale")
        else:
            image = image.convert('RGB')
            print("🎨 Converted to RGB")

        # Resize the image
        image = image.resize(target_size)
        print(f"📐 Resized image to: {target_size}")

        # Convert image to numpy array and normalize
        image_array = np.array(image) / 255.0
        print(f"🔢 Image array shape after normalization: {image_array.shape}, dtype: {image_array.dtype}")

        # If grayscale, expand channel dimension
        if to_grayscale:
            image_array = np.expand_dims(image_array, axis=-1)
            print(f"📊 Expanded dims for grayscale: {image_array.shape}")

        # Add batch dimension
        image_array = np.expand_dims(image_array, axis=0)
        print(f"📦 Final image shape (for model): {image_array.shape}")

        return image_array
    
    except Exception as e:
        print(f"❌ Error during preprocessing: {e}")
        raise

validator_model = tf.keras.models.load_model('model/fingerprint_validator_model.h5')

def is_valid_fingerprint(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert('L')  # Grayscale
    image = image.resize((96, 96))  # Resize to expected input
    img_array = np.array(image).astype('float32') / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=(0, -1))  # Shape: (1, 96, 96, 1)
    
    # Optional: save debug
    debug_image = (img_array[0] * 255).astype(np.uint8)
    Image.fromarray(debug_image.squeeze()).save("debug_validator_input_fixed.png")
    
    print("✅ Saved fixed validator input as debug_validator_input_fixed.png")
    print(f"📏 Validator input shape: {img_array.shape}")
    print(f"🔬 Mean: {np.mean(img_array)}, Std: {np.std(img_array)}")
    prediction = validator_model.predict(img_array)
    confidence = prediction[0][0]
    print(f"🧠 Validator confidence: {confidence}")
    print(f"🔍 Validator prediction: {prediction}")
    return confidence > 0.5


dataset_dir = 'fingerprint_dataset/'  # Directory with fingerprint images
dataset_embeddings = []

def load_dataset_embeddings():
    global dataset_embeddings
    print("📁 Loading fingerprint dataset...")

    for filename in os.listdir(dataset_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp')):
            image_path = os.path.join(dataset_dir, filename)
            with open(image_path, 'rb') as f:
                image_bytes = f.read()
                image = preprocess_image(image_bytes, target_size=(128, 128), to_grayscale=True)
                embedding = fingerprint_model.predict(image)
                dataset_embeddings.append(embedding[0])

    dataset_embeddings[:] = np.array(dataset_embeddings)
    print(f"✅ Loaded {len(dataset_embeddings)} fingerprint embeddings.")

# load_dataset_embeddings()

def matches_fingerprint_dataset(image_bytes, threshold=0.85):
    try:
        input_image = preprocess_image(image_bytes, target_size=(128, 128), to_grayscale=True)
        input_embedding = fingerprint_model.predict(input_image)[0]
        for dataset_embedding in dataset_embeddings:
            similarity = cosine_similarity([input_embedding], [dataset_embedding])[0][0]
            if similarity >= threshold:
                return True
        return False
    except Exception as e:
        print(f"❌ Error in fingerprint comparison: {e}")
        return False

@app.route('/')
def index():
    return "AI Model API is running."

@app.route('/predict_bloodgroup', methods=['POST'])
def predict_bloodgroup():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400
        print("hit ")
        image_file = request.files['image']
        print("image file received")
        image_bytes = image_file.read()
        # print(is_valid_fingerprint(image_bytes)+ " is valid fingerprint"   )
        # Step 1: Validate fingerprint
        # if is_valid_fingerprint(image_bytes):
        #     return jsonify({'error': 'Uploaded image is not a valid fingerprint.'}), 400
        # if not matches_fingerprint_dataset(image_bytes):
        #     return jsonify({'error': 'Uploaded image does not match any known fingerprint. Please upload a valid fingerprint image.'}), 400
        if not matches_fingerprint_dataset(image_bytes):
            return jsonify({"error": "Image is not a valid fingerprint"}), 400

        # input_data = preprocess_image(image_bytes)
        input_data = preprocess_image(image_bytes, target_size=(128, 128), to_grayscale=True)
        prediction = bloodgroup_model.predict(input_data)
        print("prediction ", prediction)
        label = bloodgroup_encoder.inverse_transform([np.argmax(prediction)])
        # print("prediction ", prediction)
        print("label ", label)

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
        # Validate fingerprint first
        # if not is_valid_fingerprint(image_bytes):
        #     return jsonify({'error': 'Uploaded image is not a valid fingerprint.'}), 400
        # if not matches_fingerprint_dataset(image_bytes):
        #     return jsonify({'error': 'Uploaded image does not match any known fingerprint. Please upload a valid fingerprint image.'}), 400
        if not is_fingerprint_image(image_bytes):
            return jsonify({"error": "Image is not a valid fingerprint"}), 400
        input_data = preprocess_image(image_bytes)

        prediction = fingerprint_model.predict(input_data)
        print("Fingerprint prediction:", prediction)
        label = fingerprint_encoder.inverse_transform([np.argmax(prediction)])
        print("Fingerprint label:", label)
        # Optional: Save debug image
        return jsonify({'prediction': label[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

def is_fingerprint_image(image_bytes, kp_threshold=50):
    # Convert bytes to numpy array
    np_arr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_GRAYSCALE)  # Decode to grayscale image

    if img is None:
        return False  # Invalid image

    sift = cv2.SIFT_create()
    keypoints, _ = sift.detectAndCompute(img, None)

    print(f"Detected keypoints: {len(keypoints)}")
    return len(keypoints) >= kp_threshold


if __name__ == '__main__':
    app.run(debug=True)
