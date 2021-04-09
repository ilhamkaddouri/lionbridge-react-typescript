from flask import Flask, jsonify, request
from flask import Flask, request, Response, make_response
from flask_restful import Api
from db.db import initialize_db
from db.user import User
from db.config import config
from flask_cors import cross_origin
app = Flask(__name__)
api = Api(app)
app.config['MONGODB_SETTINGS'] = config
initialize_db(app)

# @app.route('/users',methods=['POST'])
# def db_populate():
#     user1 = User(_id="1222",firstName="ilham",lastName="kaddouri",email="lola",hobbie="lol")
#     user2 = User(_id="ssss",firstName="ssjk",lastName="kaddouri",email="lola",hobbie="lol")
    
#     user1.save()
#     user2.save()
#     return make_response("",201)

@app.route('/users')
@cross_origin('*')
def get_users():
    output=[]
    for queue in User.objects:
        print(queue,"user")
        output.append(queue)
    
    return make_response(jsonify(output),200)

@app.route('/users',methods=['POST'])
@cross_origin('*')
def post_user():
    body = request.json
    print(body,"body")
    user_obj = User(**body).save()
    id= user_obj.id
    
    return make_response('',201)

@app.route('/users/<id>',methods=['PUT'])
@cross_origin('*')
def update_user(id):
    body = request.get_json()
    print(body,"body")
    user_obj = User.objects(id=id).first()
    print("user",user_obj)
    user_obj.update(**body)
    return make_response('',200)

if __name__ == "__main__":
    app.run(debug=True)

