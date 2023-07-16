import joblib
def createTokens(f):
    tokens = []
    for i in f:
        tokens.append(i)
    return tokens
class Classifer:
    def __init__(self):
        self.clf = None
        self.vectorise = None

    def load_model(self):
        self.vectorise = joblib.load("vectoriser.pkl")
        self.clf = joblib.load("model.pkl")

    def classify_strength(self, password):
        single_prediction = [password]
        single_predict = self.vectorise.transform(single_prediction)
        y_single = self.clf.predict(single_predict)
        return y_single[0]

# Load the trained model
c = Classifer()
c.load_model()
print(c.classify_strength("coolpassword!"))