from flask import Flask, jsonify, request
from ModelLoader import ModelLoader


def createTokens(f):
    tokens = []
    for i in f:
        tokens.append(i)
    return tokens

model_loader = ModelLoader()

app = Flask(__name__)


@app.route('/add_password', methods=['POST'])
def passwordToDataset():
    return jsonify(request.get_json()["password"])


# POST request
@app.route('/password_strength', methods=['POST'])
def passwordStrength():
    password = request.get_json()["password"]
    passwordStrength = str(model_loader.classify_strength(password))
    return jsonify(passwordStrength) , 200



if __name__ == "__main__":
    app.run(host='127.0.0.1', port="5000")