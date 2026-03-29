from sqlalchemy.orm import Session
from database.models import Prediction

def create_prediction(
        db: Session,
        review: str,
        sentiment: str,
        positive_probability: float,
        negative_probability: float
):
    db_prediction = Prediction(
        review = review,
        sentiment = sentiment,
        positive_probability = positive_probability,
        negative_probability = negative_probability
        )
    
    db.add(db_prediction)
    db.commit()
    db.refresh(db_prediction)

    return db_prediction
