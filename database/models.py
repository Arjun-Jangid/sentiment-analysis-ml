from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime, timezone
from database.connection import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    review = Column(String, nullable=False)
    sentiment = Column(String, nullable=False)
    positive_probability = Column(Float, nullable=False)
    negative_probability = Column(Float, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))