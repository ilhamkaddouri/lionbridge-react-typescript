from flask import make_response, request,jsonify
from models.user import User
from flask_restful import Resource
from flask_cors import cross_origin

class UsersApi(Resource):
    def get(self):
        users = User.objects()
        return make_response(jsonify(users),200)

    @cross_origin('*')
    def post(self):
        body = request.json
        user_obj = User(**body).save()
        id = user_obj.id
        return make_response({'id': str(id)},201)
        
class UserApi(Resource):
    def put(self, id):
        body = request.get_json()
        print(body,"body")
        user_obj = User.objects(id=id).update(**body)
        return make_response({'id': str(id)},200)
    
   