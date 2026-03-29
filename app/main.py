from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from database.connection import engine
from database.models import Base
import nltk

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')


app = FastAPI(
    title="Sentiment Analysis API",
    description="API for predicting sentiment of movie reviews",
    version="1.0"
    )

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    # react frontend
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)