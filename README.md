# Sentiment Analysis ML System

This is an end-to-end sentiment analysis web application that predicts whether a movie review is positive or negative using machine learning.

This project demonstrates a complete machine learning lifecycle from data preprocessing to deployment.

An end-to-end sentiment analysis system built with:

- Machine Learning (Scikit-learn)
- FastAPI
- React



## 🚀 Live Demo
https://sentiment-analysis-ml-peach.vercel.app/



## 📸 Screenshot
<img width="1440" height="703" alt="demo" src="https://github.com/user-attachments/assets/bdc6d788-0e47-4bce-beb5-e5a9e2bdaca4" />



## Features

- Sentiment prediction using TF-IDF + Logistic Regression
- REST API built with FastAPI
- React frontend for user interaction
- Prediction history stored in database
- Pagination support (Show More functionality)
- Real-time prediction with probability scores



## Key Highlights

- Built complete ML pipeline from data preprocessing to deployment
- Integrated ML model with FastAPI backend and React frontend
- Implemented real-time prediction with probability scores
- Migrated database from SQLite to PostgreSQL
- Designed scalable backend architecture



## Tech Stack

- Python
- Scikit-learn
- FastAPI
- React
- SQLAlchemy
- SQLite / PostgreSQL



## Project Structure

```
sentiment-analysis-ml/
├── app/        # FastAPI backend
├── data/       # Dataset
├── database/   # DB models & CRUD
├── frontend/   # React UI
├── models/     # Trained model (.pkl)
├── src/        # ML pipeline (training, preprocessing)
```



## Model

- Vectorizer: TF-IDF
- Algorithm: Logistic Regression
- Hyperparameter tuning using Optuna
- Evaluation metric: Accuracy, Confusion Matrix, Precision, Recall
- Achieved ~90% accuracy on IMDB dataset



## Setup

#### Backend
pip install -r requirements.txt
uvicorn app.main:app --reload

#### Frontend
cd frontend
npm install
npm run dev



## API Endpoints

#### POST /predict

Predict sentiment of a review

Request:
{
"review": "This movie was amazing"
}

Response:
{
"sentiment": "positive",
"positive_probability": 0.98,
"negative_probability": 0.02
}

#### GET /history

Fetch prediction history with limit
Example: /history?limit=10



## Author

Arjun Jangid
