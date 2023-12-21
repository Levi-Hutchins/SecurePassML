# This class is used AFTER the model has been trained and dumped to a pkle file.
# By initialising this file we are able to load the results of the model and make
# predicitions without having to re-train the model.
import joblib
from config.paths_config import VECTORISE_PATH, MODEL_PATH

class ModelLoader:
    def __init__(self):
        self._vectorise = None
        self._clf = None
    def createTokens(self, f):
        tokens = []
        for i in f:
            tokens.append(i)
        return tokens
    @property
    def vectorise(self):
        if self._vectorise is None:
            self._vectorise = joblib.load(VECTORISE_PATH)
        return self._vectorise

    @property
    def clf(self):
        if self._clf is None:
            self._clf = joblib.load(MODEL_PATH)
        return self._clf

    def classify_strength(self, password) -> int:
        single_prediction = [password]
        single_predict = self.vectorise.transform(single_prediction)
        y_single = self.clf.predict(single_predict)
        return y_single[0]
