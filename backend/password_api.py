# Flask API
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import csv
import openai
import re
from config.openai_config import OPENAI_API_KEY
from config.paths_config import DATASET_PATH,ROCKYOU_PATH,TENMILL_PATH
from ModelLoader import ModelLoader

openai.api_key = OPENAI_API_KEY

def gpt_prompt(password, model="gpt-3.5-turbo"):
    prompt = f"give me 5 new passwords for this passsword (make it at least 13 characters): {password}"
    messages = [{"role": "user", "content": prompt}]

    response = openai.ChatCompletion.create(

    model=model,

    messages=messages,

    temperature=0,
    )

    return response.choices[0].message["content"]


app = Flask(__name__)

CORS(app)

model_loader = ModelLoader()

@app.route('/add_password', methods=['POST'])
def passwordToDataset(password, passwordStrength):
    with open(DATASET_PATH, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([password, passwordStrength])
    return jsonify(request.get_json()["password"])


# POST request
@app.route('/password_strength', methods=['POST'])
def passwordStrength():
   
    print("Request from: ", request.remote_addr)
    password = request.get_json()["password"]
    passwordStrength = str(model_loader.classify_strength(password))
    #passwordToDataset(password, passwordStrength)
    return jsonify(passwordStrength) , 200

@app.route('/generate_passwords', methods=['POST'])
def generate_passwords():
    password = request.get_json()["password"]
    securePasswords = re.findall(r'\d+\.\s*(.+?)(?=\s\d+\.|\s*$)', gpt_prompt(password))
    return jsonify(securePasswords) , 200

@app.route('/check_rockyou', methods=['POST'])
def check_rockyou():
    password = request.get_json()["password"]
    with open(ROCKYOU_PATH, 'r', encoding='iso-8859-1') as file:
        return jsonify(password in file.read())
    

@app.route('/check_10mill', methods=['POST'])
def check_10mill():
    password = request.get_json()["password"]
    with open(TENMILL_PATH, 'r', encoding='iso-8859-1') as file:
        return jsonify(password in file.read())
