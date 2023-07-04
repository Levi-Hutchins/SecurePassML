import numpy as np
import pandas as pd
import random as r
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.tree import DecisionTreeClassifier
import joblib

clf = None
vectorise = None

def createTokens(f):
    tokens = []
    for i in f:
        tokens.append(i)
    return tokens

def train_model():
    global clf, vectorise

    print("Training the model...")
    passwordData = pd.read_csv("../../datasets/dataset.csv", on_bad_lines='skip')
    passwordData.dropna(inplace=True)
    passwordData = np.array(passwordData)
    r.shuffle(passwordData)

    y_values = [y[1] for y in passwordData]
    passwords = [x[0] for x in passwordData]

    vectorise = TfidfVectorizer(tokenizer=createTokens)
    X = vectorise.fit_transform(passwords)
    clf = DecisionTreeClassifier()
    clf.fit(X, y_values)

    # Save the trained model
    joblib.dump(clf, "model.pkl")
    joblib.dump(vectorise, "vectoriser.pkl")

    print("Model training complete.")

def classify_strength(password):
    global clf, vectorise

    if clf is None or vectorise is None:
        raise ValueError("Model not trained. Please call 'train_model()' first.")

    # Load the trained model
    clf = joblib.load("model.pkl")
    vectorise = joblib.load("vectoriser.pkl")

    single_prediction = [password]
    single_predict = vectorise.transform(single_prediction)
    y_single = clf.predict(single_predict)
    print(password, "has a strength of", y_single[0])

# Training the model
train_model()

# Classify passwords
classify_strength("password1")
classify_strength("strongpassword")
