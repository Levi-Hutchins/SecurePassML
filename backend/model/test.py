import numpy as np
import pandas as pd
import random as r
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.tree import DecisionTreeClassifier
import queue
import threading

# Global variables
clf = None
vectorise = None
prediction_queue = queue.Queue()


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

    print("Model training complete.")


def classify_passwords():
    global clf, vectorise

    while True:
        password = prediction_queue.get()

        single_prediction = [password]
        single_predict = vectorise.transform(single_prediction)
        y_single = clf.predict(single_predict)
        print(password, "has a strength of", y_single[0])


def main(password):
    # Training the model
    train_model()

    # Create and start the classification thread
    classification_thread = threading.Thread(target=classify_passwords)
    classification_thread.start()

    # Enter the main loop to receive passwords and classify them
    while True:

        prediction_queue.put(password)

    # Wait for the classification thread to finish
    classification_thread.join()


# Start the main process
if __name__ == "__main__":
    main()
