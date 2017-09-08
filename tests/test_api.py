import requests;
import json;

class TestAPI():
  def __init__(self):
    self.host = "http://127.0.0.1:3000"
    self.token = None
    self.user = None

    self.setUser("test@gmail.com", "111111")
    print("Application initialized.")


  def setUser(self, email, password):
    self.user = {
      "email": email,
      "password": password
    }
    
    print("Testing user:" + self.user['email'])

  def getUser(self):
    r = requests.get(self.host + "/api/username",
      headers={'Authorization': self.token}
    )
    print(r.text)

  def getUsersTasks(self):
    r = requests.get(self.host + "/api/users_tasks",
      headers={'Authorization': self.token}
    )
    print(r.text)

  def getToken(self):
      r = requests.post(
              self.host + "/api/get_token",
              json=self.user
      )

      token = r.json()["token"]
      self.token = token

      print('Authorization token received.')
      print('Token:' + token)

  def createTask(self, data={'name': 'New Task','category': 'New Category'}):
    r = requests.post(self.host + "/api/create_task", 
      json=data,
      headers={'Authorization': self.token}
    )
    print(r.text)

  def stopTask(self, id):
    r = requests.post(self.host + "/api/stop_task", 
      json={'id': id},
      headers={'Authorization': self.token}
    )
    print(r.text)


def main():
  app = TestAPI()

  token = app.getToken()
  app.createTask()

  # app.stop_task(token)
  
  # app.get_user(token)
  # app.get_users_tasks(token)

if __name__ == '__main__':
    main() 