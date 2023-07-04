import numpy as np
import pandas as pd
import random as r
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

single_predictions = []

def createTokens(f):
    tokens = []
    for i in f:
        tokens.append(i)
    return tokens
def train_model():
    passwordData = pd.read_csv("../../datasets/dataset.csv", on_bad_lines='skip')

    passwordData.dropna(inplace=True)

    passwordData = np.array(passwordData)

    r.shuffle(passwordData)

    y_values = [y[1] for y in passwordData]
    passwords = [x[0] for x in passwordData]


    vectorise = TfidfVectorizer(tokenizer=createTokens)
    X = vectorise.fit_transform(passwords)
    X_train, X_test, y_train, y_test = train_test_split(X, y_values, test_size=0.2, random_state=42)
    clf = DecisionTreeClassifier()

    clf.fit(X_train, y_train)


    # singlePredict = vectorise.transform(single_predictions)
    # y_Single = clf.predict(singlePredict)
    # print(single_predictions[0], "Has a strength of ", y_Single)

