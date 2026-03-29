from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from database.connection import engine
from database.models import Base
import nltk
import os

nltk_data_path = os.path.join(os.getcwd(), "nltk_data")
os.makedirs(nltk_data_path, exist_ok=True)
nltk.data.path.append(nltk_data_path)

nltk.download('stopwords', download_dir=nltk_data_path)
nltk.download('punkt', download_dir=nltk_data_path)


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