import joblib
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, roc_auc_score
from app.core.config import MODEL_PATH


def evaluate_model(X_test, y_test):
    try:
        model = joblib.load(MODEL_PATH)
    except FileNotFoundError:
        print("Error: Model file not found.")
        return
    except Exception as e:
        print(f"Error: {e}")
        return

    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred)
    cm = confusion_matrix(y_test, y_pred)
    auc = roc_auc_score(y_test, y_pred)

    print(f"Accuracy: {accuracy}")
    print(f"Classification Report:\n{report}")
    print(f"Confusion Matrix:\n{cm}")
    print(f"AUC-ROC: {auc}")