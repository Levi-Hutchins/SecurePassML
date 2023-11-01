from flask import Flask, jsonify, request
import passwordClassifer
def createTokens(f):
    tokens = []
    for i in f:
        tokens.append(i)
    return tokens

c = passwordClassifer.Classifer()
c.load_model()

app = Flask(__name__)

incomes = [
    { 'description': 'salary', 'amount': 5000 }
]
passwords = [

]

# GET request
@app.route('/incomes')
def get_incomes():
    
    return jsonify(incomes)


# POST request
@app.route('/password_strength', methods=['POST'])
def passwordStrength():
    password = request.get_json()["password"]
    passwordStrength = c.classify_strength(password)

    passwords.append(request.get_json())
    print("before")
   
    passwords.pop()
    print("after")
    return jsonify(str(passwordStrength)) , 200

if __name__ == "__main__":
    app.run(host='127.0.0.1', port="5000")