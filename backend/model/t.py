import numpy as np
import pandas as pd
import random as r
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
import joblib

# Tokenizer
def createTokens(f):
    tokens = []
    for i in f:
        tokens.append(i)
    return tokens

class passwordModel:
    def __init__(self):
        self.clf = None
        self.vectorise = None

    def train_model(self):
        print("Training the model...")
        passwordData = pd.read_csv("../../datasets/dataset.csv", on_bad_lines='skip')
        passwordData.dropna(inplace=True)
        passwordData = np.array(passwordData)
        r.shuffle(passwordData)

        y_values = [y[1] for y in passwordData]
        passwords = [x[0] for x in passwordData]

        self.vectorise = TfidfVectorizer(tokenizer=createTokens, ngram_range=(1, 2))
        X = self.vectorise.fit_transform(passwords)

        # Splitting the dataset into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y_values, test_size=0.2, random_state=42)

        self.clf = RandomForestClassifier(n_estimators=50, max_depth=10, n_jobs=-1)

        # Hyperparameter tuning (simple example)
        parameters = {'n_estimators': [100, 200], 'max_depth': [10, 20]}
        grid_search = GridSearchCV(self.clf, parameters, cv=3)
        grid_search.fit(X_train, y_train)

        # Using the best estimator
        self.clf = grid_search.best_estimator_

        # Evaluation on the test set
        y_pred = self.clf.predict(X_test)
        print("Accuracy:", accuracy_score(y_test, y_pred))
        print("Precision:", precision_score(y_test, y_pred, average='macro'))
        print("Recall:", recall_score(y_test, y_pred, average='macro'))
        print("F1 Score:", f1_score(y_test, y_pred, average='macro'))
        print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))

        # Save the model and vectorizer
        joblib.dump(self.clf, "./pkl/model.pkl")
        joblib.dump(self.vectorise, "./pkl/vectorise.pkl")

        print("...Training complete...")

    def classify_strength(self, password):
        if self.clf is None or self.vectorise is None:
            raise ValueError("Model not trained. Please call 'train_model()' first.")

        self.clf = joblib.load("./pkl/model.pkl")
        self.vectorise = joblib.load("./pkl/vectorise.pkl")

        single_prediction = [password]
        single_predict = self.vectorise.transform(single_prediction)
        y_single = self.clf.predict(single_predict)
        print(password, "has a strength of", y_single[0])

if __name__ == "__main__":
    m = passwordModel()
    m.train_model()
