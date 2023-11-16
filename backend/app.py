# Flask API
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import csv
import openai
import re
from config.openai_config import OPENAI_API_KEY
from model.ModelLoader import ModelLoader
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, "../datasets", "dataset.csv")

openai.api_key = OPENAI_API_KEY

def gpt_prompt(password, model="gpt-3.5-turbo"):
    prompt = f"give me 5 new passwords for this passsword (make it strong): {password}"
    messages = [{"role": "user", "content": prompt}]

    response = openai.ChatCompletion.create(

    model=model,

    messages=messages,

    temperature=0,
    )

    return response.choices[0].message["content"]

def createTokens(f):
    tokens = []
    for i in f:
        tokens.append(i)
    return tokens

model_loader = ModelLoader()

app = Flask(__name__)
CORS(app)

@app.route('/add_password', methods=['POST'])
def passwordToDataset(password, passwordStrength):
    with open(DATASET_PATH, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([password, passwordStrength])
    return jsonify(request.get_json()["password"])


# POST request
@app.route('/password_strength', methods=['POST'])
def passwordStrength():
    password = request.get_json()["password"]
    passwordStrength = str(model_loader.classify_strength(password))
    #passwordToDataset(password, passwordStrength)
    return jsonify(passwordStrength) , 200

@app.route('/generate_passwords', methods=['GET'])
def generate_passwords():
    password = request.get_json()["password"]
    securePasswords = re.findall(r'\d+\.\s*(.+?)(?=\s\d+\.|\s*$)', gpt_prompt(password))
    return jsonify(securePasswords) , 200


if __name__ == "__main__":
    app.run(host='127.0.0.1', port="5000")