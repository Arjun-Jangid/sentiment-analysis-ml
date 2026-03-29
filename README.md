# Sentiment Analysis ML System

An end-to-end sentiment analysis system built with:

- Machine Learning (Scikit-learn)
- FastAPI
- React

## Features

- Sentiment prediction using TF-IDF + Logistic Regression
- REST API built with FastAPI
- React frontend for user interaction
- Prediction history stored in database
- Pagination support (Show More functionality)
- Real-time prediction with probability scores

## Tech Stack

- Python
- Scikit-learn
- FastAPI
- React
- SQLAlchemy
- SQLite / PostgreSQL

## Project Structure

sentiment-analysis-ml/
├── app/ # FastAPI API
├── src/ # ML training & preprocessing
├── models/ # Trained model

├── frontend/ # React UI

## Project Structure

sentiment-analysis-ml/
├── app/ # FastAPI backend
├── data/ # Dataset
├── database/ # DB models & CRUD
├── frontend/ # React UI
├── models/ # Trained model (.pkl)
├── src/ # ML pipeline (training, preprocessing)

## Model

- Vectorizer: TF-IDF
- Algorithm: Logistic Regression
- Hyperparameter tuning using Optuna
- Evaluation metric: Accuracy, Confusion Matrix, Precision, Recall

## Run Backend

uvicorn app.main:app --reload

## Run Frontend

cd frontend
npm install
npm run dev

## API Endpoints

### POST /predict

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

### GET /history

Fetch prediction history with limit
Example: /history?limit=10

## Demo

App Screenshot -> (images/demo.png)

## Author

Arjun Jangid
