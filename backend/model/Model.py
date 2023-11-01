# Machine Learning Model
import numpy as np
import pandas as pd
import random as r
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.tree import DecisionTreeClassifier
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

        self.vectorise = TfidfVectorizer(tokenizer=createTokens)
        X = self.vectorise.fit_transform(passwords)
        self.clf = DecisionTreeClassifier()
        self.clf.fit(X, y_values)

        # Found pkl files for saving a model and use later
        # without having to re-train
        joblib.dump(self.clf, "./pkl/model.pkl")
        joblib.dump(self.vectorise, "./pkl/vectorise.pkl")

        print("...Training complete...")

    def classify_strength(self,password):

        if self.clf is None or self.vectorise is None:
            raise ValueError("Model not trained. Please call 'train_model()' first.")

        # Load the trained model this allows the user to only train the model once before testing passwords
        self.clf = joblib.load("./pkl/model.pkl")
        self.vectorise = joblib.load("./pkl/vectorise.pkl")

        single_prediction = [password]
        single_predict = self.vectorise.transform(single_prediction)
        y_single = self.clf.predict(single_predict)
        print(password, "has a strength of", y_single[0])



if __name__ == "__main__":
    m = passwordModel()
    m.train_model()
