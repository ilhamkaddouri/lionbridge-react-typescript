from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from db.db import initialize_db
from flask_restful import Api
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from routers.router import UsersApi,UserApi
from db.config import config

app= Flask(__name__)
api = Api(app)
app.config['MONGODB_SETTINGS'] = config

initialize_db(app)



api.add_resource(UsersApi, '/api/users')
api.add_resource(UserApi, '/api/users/<id>')

if __name__ == "__main__":
    app.run(debug=True)

