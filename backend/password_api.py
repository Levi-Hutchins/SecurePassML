from flask import Flask, jsonify, request
from SecurePassML.backend.model import test

app = Flask(__name__)

incomes = [
    { 'description': 'salary', 'amount': 5000 }
]
passwords = [

]
def test1():
    return 5+2
# GET request
@app.route('/incomes')
def get_incomes():
    return jsonify(passwords)

# POST request
@app.route('/incomes', methods=['POST'])
def add_income():
    #incomes.append(request.get_json())
    passwords.append(request.get_json())
    print("before")
    classification = test.main(passwords[0]["value"])
    passwords.pop()
    print("after")
    return jsonify("Success"), 204