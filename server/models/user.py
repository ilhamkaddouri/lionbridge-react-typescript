from db.db import db
from mongoengine import StringField

class User(db.Document):
    firstName = StringField(required=True)
    lastName = StringField(required=True)
    email = StringField(required=True)
    hobbie = StringField()
   
    
   