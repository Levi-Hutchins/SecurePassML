import numpy as np
import pandas as pd
import random as r
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
import joblib
from utils import createTokens


class passwordModel:
    def __init__(self):
        self.clf = None
        self.vectorise = None

    def train_model(self):
        print("Training the model...")
        # Clean up data and prepare for training
        passwordData = pd.read_csv("../../datasets/dataset.csv", on_bad_lines='skip')
        passwordData.dropna(inplace=True)
        passwordData = np.array(passwordData)
        r.shuffle(passwordData)
        y_values = [y[1] for y in passwordData]
        passwords = [x[0] for x in passwordData]

        # Custom tokenizer 
        self.vectorise = TfidfVectorizer(tokenizer=createTokens, ngram_range=(1, 2))
        X = self.vectorise.fit_transform(passwords)

        # Splitting the dataset into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y_values, test_size=0.25, random_state=42)

        # Refactored model to use RandomForestClassifier as it poses better results for classification problems
        self.clf = RandomForestClassifier(n_estimators=10, criterion='entropy', random_state=0)
        self.clf.fit(X_train, y_train)

        # Evaluation on the test set
        y_pred = self.clf.predict(X_test)
        
        # Stats
        print("---------- Model Statistics ----------\n")
        print("Accuracy:", accuracy_score(y_test, y_pred))
        print("Precision:", precision_score(y_test, y_pred, average='macro'))
        print("Recall:", recall_score(y_test, y_pred, average='macro'))
        print("F1 Score:", f1_score(y_test, y_pred, average='macro'))
        print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))
        print("\n--------------------------------------")
        
        # Save the model and vectorizer
        joblib.dump(self.clf, "./pkl/model.pkl")
        joblib.dump(self.vectorise, "./pkl/vectorise.pkl")
        print("...Training complete...")



if __name__ == "__main__":
    m = passwordModel()
    m.train_model()
