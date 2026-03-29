import joblib
from app.core.config import MODEL_PATH

def load_model():
    return joblib.load(MODEL_PATH)

pipeline = load_model()

def predict_sentiment(review):
    prediction = pipeline.predict([review])[0]
    probabilities = pipeline.predict_proba([review])[0]

    negative_prob = float(probabilities[0])
    positive_prob = float(probabilities[1])

    return {
        "sentiment": prediction,
        "positive_probability": round(positive_prob, 3),
        "negative_probability": round(negative_prob, 3)
    }


if __name__ == "__main__":
    text = "This movie was amazing and fantastic"
    result = predict_sentiment(text)
    print("Prediction:", result)