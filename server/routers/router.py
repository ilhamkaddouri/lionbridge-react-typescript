from flask_pymongo import PyMongo, ObjectId
from flask import Response, request
from db.user import User
from flask_restful import Resource
from flask_cors import cross_origin
from flask_mongoengine import MongoEngine

class UsersApi(Resource):
    def get(self):
        # pylint: disable=maybe-no-member
        users = User.objects().to_json()
        print(users,"hello")
        return Response(users, mimetype="application/json", status=200)

    @cross_origin('*')
    def post(self):
        body = request.get_json()
        user =  User(**body).save()
        id = user.id
        return {'id': str(id)}, 200
        
class UserApi(Resource):
    def put(self, id):
        body = request.get_json()
        print(body)
        # pylint: disable=maybe-no-member
        User.objects.get(id=id).update(**body)
        return {'id': str(id)}, 200
    
    @cross_origin('*')
    def delete(self, id):
        # pylint: disable=maybe-no-member
        user = User.objects.get(id=id).delete()
        return '', 200
    
    @cross_origin('*')
    def get(self, id):
        # pylint: disable=maybe-no-member
        users = User.objects.get(id=id).to_json()
        return Response(users, mimetype="application/json", status=200)