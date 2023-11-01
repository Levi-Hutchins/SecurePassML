import joblib

class ModelLoader:
    def __init__(self):
        self._vectorise = None
        self._clf = None
        
    @property
    def vectorise(self):
        if self._vectorise is None:
            self._vectorise = joblib.load("./pkl/vectorise.pkl")
        return self._vectorise

    @property
    def clf(self):
        if self._clf is None:
            self._clf = joblib.load("./pkl/model.pkl")
        return self._clf

    def classify_strength(self, password):
        single_prediction = [password]
        single_predict = self.vectorise.transform(single_prediction)
        y_single = self.clf.predict(single_predict)
        return y_single[0]
