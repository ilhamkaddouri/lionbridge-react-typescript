from flask import Flask
from flask_restful import Api
from db.db import initialize_db
from models.user import User
from db.config import config
from quart import Quart
from flask_cors import CORS
import asyncio
from router.router import UsersApi,UserApi

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
}
api = Api(app)

app.config['MONGODB_SETTINGS'] = config

initialize_db(app)

api.add_resource(UsersApi, '/api/v1.0.0/users')
api.add_resource(UserApi, '/api/v1.0.0/users/<id>')



if __name__ == '__main__':
    app.run(debug=True)