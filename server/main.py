from flask import Flask, jsonify, request,make_response
from flask_pymongo import PyMongo
from db.db import initialize_db
from flask_restful import Api
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from flask_cors import cross_origin
from routers.router import UsersApi,UserApi
from db.user import User
from db.config import config

app= Flask(__name__)
#app.config["MONGO_URI"] = "mongodb+srv://ilham:mongoadmin@cluster0.2slfn.mongodb.net/lionbridge_rest?retryWrites=true&w=majority"
#mongo = PyMongo(app)
api = Api(app)
app.config['MONGODB_HOST'] = config

initialize_db(app)

#user = mongo.db.users


cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/api/v1.0/users', methods=['GET'])
@cross_origin('*')
def get_users():
    output = []
     # pylint: disable=maybe-no-member
    for queue in User.objects():
        print(queue)
        output.append(queue)
    
    return jsonify({'result': output})    

# @app.route('/api/v1.0/users/<id>', methods=['GET','PUT'])
# def get_user(id):
    
#     queue = user.find_one({'_id':id})
#     if queue:
#         output ={"firstName":queue['firstName'],'lastName':queue['lastName']}
#     else:
#         output = 'no results found'

#     return jsonify({'result': output}) 

# def update_user(id):
    
#     q = user.find_one({'_id':id})
#     if q:
#         output = {"firstName":q['firstName'],'lastName':q['lastName']}
#     else:
#         output = 'no results found'

#     return jsonify({'result': output}) 

# @app.route('/api/v1.0/users', methods=['POST'])
# def add_user():
#     firstName = request.json['firstName']
#     lastName = request.json['lastName']
#     email = request.json['email']
#     hobbie = request.json['hobbie']
#     user_id = user.insert({'firstName':firstName,'lastName':lastName,'email':email,'hobbie':hobbie})
#     new_user = user.find_one({'_id' :user_id})

#     output =  {"firstName":new_user['firstName'],'lastName':new_user['lastName']}
#     return jsonify({'result': output}) 

@app.route('/')
def index():
    return "Hello, World!"


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == "__main__":
    app.run(debug=True)

