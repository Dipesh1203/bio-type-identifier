from keras.models import load_model
import pickle

model = load_model("../model/bloodgroup_fingerprint_model.keras")

with open("model/label_encoder.pkl", "rb") as f:
    label_encoder = pickle.load(f)
