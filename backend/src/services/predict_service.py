import numpy as np
from app.utils.model_loader import model, label_encoder

def make_prediction(input_data):
    input_array = np.array([input_data])
    prediction = model.predict(input_array)
    predicted_class = np.argmax(prediction, axis=1)
    label = label_encoder.inverse_transform(predicted_class)
    return label[0]
