# Sentiment Analysis ML System

An end-to-end sentiment analysis system built with:

- Machine Learning (Scikit-learn)
- FastAPI
- React
- Docker

## Features

- Sentiment prediction using TF-IDF + Logistic Regression
- REST API built with FastAPI
- React frontend for user interaction
- Batch prediction support
- Dockerized deployment

## Tech Stack

- Python
- Scikit-learn
- FastAPI
- React
- Docker

## Project Structure

sentiment-analysis-ml/
├── app/ # FastAPI API
├── src/ # ML training & preprocessing
├── models/ # Trained model
├── data/ # Dataset
├── frontend/ # React UI

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
npm start

## API Endpoint

POST /predict

Request:

{
"review": "This movie was amazing"
}

Response:

{
"sentiment": "positive"
}

## Demo

App Screenshot -> (images/demo.png)

## Author

Arjun Jangid
