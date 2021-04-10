from flask import Flask, request, make_response,jsonify
from flask_restful import Api
from db.db import initialize_db
from models.user import User
from db.config import config
from quart import Quart
from flask_cors import cross_origin
import asyncio


app = Flask(__name__)
api = Api(app)
app.config['MONGODB_SETTINGS'] = config
initialize_db(app)


@app.route('/api/v1.0.0/users')
@cross_origin('*')
def get_users():
    users = User.objects()
    return make_response(jsonify(users),200)


@app.route('/api/v1.0.0/users',methods=['POST'])
@cross_origin('*')
def post_user():
    body = request.json
    #print(body,"body")
    user_obj = User(**body).save()
    id = user_obj.id
    return make_response({'id': str(id)},201)


@app.route('/api/v1.0.0/users/<id>',methods=['PUT'])
@cross_origin('*')
def update_user(id):
    body = request.get_json()
    print(body,"body")
    user_obj = User.objects(id=id).update(**body)
    
    return make_response({'id': str(id)},200)



if __name__ == "__main__":
    app.run(debug=True)

