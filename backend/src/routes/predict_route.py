from flask import Blueprint, request
from src.controllers.predict_controller import handle_prediction

predict_bp = Blueprint("predict_bp", __name__)

@predict_bp.route("/predict", methods=["POST"])
def predict():
    return handle_prediction(request)
