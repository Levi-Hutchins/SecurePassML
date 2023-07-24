import joblib
import sys

def createTokens(f):
    tokens = []
    for i in f:
        tokens.append(i)
    return tokens
# This class allows for fast classification after the training is complete
class Classifer:
    def __init__(self):
        self.vectorise = joblib.load("./pkl/vectorise.pkl")
        self.clf = joblib.load("./pkl/model.pkl")

    def load_model(self):
        self.vectorise = joblib.load("./pkl/vectorise.pkl")
        self.clf = joblib.load("./pkl/model.pkl")

    def classify_strength(self, password):
        single_prediction = [password]
        single_predict = self.vectorise.transform(single_prediction)
        y_single = self.clf.predict(single_predict)
        return y_single[0]



def classifyPassword(password):
    c = Classifer()
    c.load_model()
    return c.classify_strength(password)
