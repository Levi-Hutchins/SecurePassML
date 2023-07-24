from flask import Flask, jsonify, request
import joblib
import passwordClassifer
import ttt


app = Flask(__name__)

incomes = [
    { 'description': 'salary', 'amount': 5000 }
]
passwords = [

]
def test1(password):
    return passwordClassifer.classifyPassword(password)
# GET request
@app.route('/incomes')
def get_incomes():
    return jsonify(passwords)


# POST request
@app.route('/incomes', methods=['POST'])
def add_income():
    def createTokens(f):
        tokens = []
        for i in f:
            tokens.append(i)
        return tokens

    #incomes.append(request.get_json())
    passwords.append(request.get_json())
    print("before")
    #classification = test.main(passwords[0]["value"])
    ttt.inputPassword(passwords[0]["value"])
    #y = passwordClassifer.classifyPassword(passwords[0]["value"])
    passwords.pop()
    print("after")
    return jsonify("hello"), 204



