# SecurePassML
Secure Password Maching Learning WebApp

## Description
### What is it?
SecurePassML is a project I have embarked on to express my interest in both security, software development and machine learning. Throughout the development of SecurePassML I have extended my knowledged in all of these fields and will continously update this project as my skills and knowledge improves.
It is a full stack web app that incorporates machine learning in order to classify a given password (0, 1, 2) = (weak, medium, strong) 

## How to Install / Run
Currently whilst under development the only way top run this application is to run locally. This will be rectified once a release has been established and tested - which it will then be deployed.

Clone the Repository
```
git clone https://github.com/Levi-Hutchins/SecurePassML.git
```
Train model and run tests
```
python3 SecurePassML/backend/model/Model.py
python3 SecurePassML/backend/model/tests/test_model.py
```
Run Flask API
```
python3 SecurePassML/backend/app.py
```
Start npm server and build react frontend
```
cd SecurePassML/frontend
npm start
```
