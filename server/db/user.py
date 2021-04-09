from .db import db
from mongoengine import StringField, IntField

class User(db.Document):
    firstName = StringField(required=True)
    lastName = StringField(required=True)
    email = StringField(required=True)
    hobbie = StringField()
    # def to_json(self):
    #     return{
    #         "firstName": self.firstName,
    #         "lastName" : self.lastName,
    #         "email" : self.email,
    #         "hobbie" : self.hobbie
    #     }
    
   