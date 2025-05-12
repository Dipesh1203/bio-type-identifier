# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import numpy as np
# from keras.models import load_model
# import pickle

# app = Flask(__name__)
# CORS(app)  # Enable CORS

# model = load_model("model/my_model.keras")
# with open("model/label_encoder.pkl", "rb") as f:
#     label_encoder = pickle.load(f)

# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.json["input_data"]  # Expecting a list
#         input_array = np.array([data])
#         prediction = model.predict(input_array)
#         predicted_class = np.argmax(prediction, axis=1)
#         label = label_encoder.inverse_transform(predicted_class)
#         return jsonify({"prediction": label[0]})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

# Register blueprint for predict route
from src.routes.predict_route import predict_bp
app.register_blueprint(predict_bp)

if __name__ == "__main__":
    app.run(debug=True)

