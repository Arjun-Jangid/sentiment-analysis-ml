from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_PATH = BASE_DIR / "data" / "IMDB Dataset.csv"
MODEL_PATH = BASE_DIR / "models" / "sentiment_model.pkl"