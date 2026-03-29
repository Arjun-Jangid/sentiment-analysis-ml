from pydantic import BaseModel, ConfigDict


class ReviewRequest(BaseModel):
    review: str


class PredictionResponse(BaseModel):
    sentiment: str
    positive_probability: float
    negative_probability: float


class HistoryRead(BaseModel):
    id: int
    review: str
    sentiment: str
    positive_probability: float
    negative_probability: float

    model_config = ConfigDict(from_attributes=True)


class HistoryResponse(BaseModel):
    items: list[HistoryRead]
    has_more: bool