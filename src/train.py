import joblib
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from src.feature_engineering import build_vectorizer
from app.core.config import DATA_PATH, MODEL_PATH



def train_model(data_path):

    print("Loading data...")
    try:
        df = pd.read_csv(data_path)
    except FileNotFoundError:
        print("Error: File not found.")
        return
    except Exception as e:
        print(f"Error: {e}")
        return

    X = df['review']
    y = df['sentiment']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    print("Preprocessing and training model...")

    vectorizer = build_vectorizer()

    model = LogisticRegression(
        C=3.124289809658247,
        solver='saga',
        max_iter=1000,
        random_state=42
     )
    
    pipeline = Pipeline([
        ('vectorizer', vectorizer),
        ('classifier', model)
    ])

    print("Fitting model...")

    pipeline.fit(X_train, y_train)
    joblib.dump(pipeline, MODEL_PATH)

    print(f"Model trained and saved as 'sentiment_model.pkl'")


print("File starting...")

if __name__ == "__main__":
    train_model(DATA_PATH)

