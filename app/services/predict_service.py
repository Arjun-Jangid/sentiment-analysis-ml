from src.predict import predict_sentiment
from database.crud import create_prediction
from database.models import Prediction


def get_prediction(review: str, db):
    result = predict_sentiment(review)

    create_prediction(
        db=db,
        review=review,
        sentiment=result["sentiment"],
        positive_probability=result["positive_probability"],
        negative_probability=result["negative_probability"],
    )

    return result


def get_prediction_history(db, limit: int):
    query = db.query(Prediction).order_by(Prediction.id.desc())

    items = query.limit(limit + 1).all()

    has_more = len(items) > limit

    return items[:limit], has_more