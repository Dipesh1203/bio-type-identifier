from flask import jsonify
from app.services.predict_service import make_prediction

def handle_prediction(request):
    try:
        input_data = request.json["input_data"]
        prediction = make_prediction(input_data)
        return jsonify({"prediction": prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
