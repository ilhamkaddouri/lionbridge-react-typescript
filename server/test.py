try:
    from app import app
    import unittest
    import json

except Exception as e:
    print("some modeuls are missing {}".format(e))

class FlaskTest(unittest.TestCase):

    def setUp(self):
        self.data={
            "firstName":"John",
            "lastName":"Doe",
            "email":"Johndoe@gmail.com",
            "hobbie" : "Playing"
        }
        self.new ={
                "email": "johndoe.lionbridge@email.com"
            }
        



    #check status code
    def test_index(self):
        tester= app.test_client(self)
        response = tester.get("/api/v1.0.0/users")
        statuscode = response.status_code
        self.assertEqual(statuscode,200)
    
    #check content type
    def test_index_content(self):
        tester= app.test_client(self)
        response = tester.get("/api/v1.0.0/users")
        response = response.content_type
        self.assertEqual(response,"application/json")
    
    #check post user
    def test_index_post(self):
        tester= app.test_client(self)
        response = tester.post("/api/v1.0.0/users",data=json.dumps(self.data),content_type="application/json")
        statuscode = response.status_code
        content = response.content_type
        self.assertEqual(content,"application/json")
        self.assertEqual(statuscode,201)
    
    #check update user
    def test_index_put(self):
        tester= app.test_client(self)
    
        response =tester.put("/api/v1.0.0/users/607199a113dc7c4348f5a420",data=json.dumps(self.new),content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type,"application/json")

if __name__ == "__main__":
    unittest.main()
