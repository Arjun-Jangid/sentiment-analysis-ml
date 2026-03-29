from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.schemas.schemas import ReviewRequest, PredictionResponse, HistoryResponse
from app.services.predict_service import get_prediction, get_prediction_history
from database.connection import get_db

router = APIRouter()


@router.get("/")
def home():
    return {
        "message": "Welcome to the Sentiment Analysis API."
    }

@router.get("/history", response_model=HistoryResponse)
def get_history(limit: int = Query(10, le=100), db: Session = Depends(get_db)):
    items, has_more = get_prediction_history(db, limit)

    return {
        "items": items,
        "has_more": has_more
    }

@router.post("/predict", response_model=PredictionResponse)
def predict(request: ReviewRequest, db:Session = Depends(get_db)):
    result = get_prediction(request.review, db)
    return result