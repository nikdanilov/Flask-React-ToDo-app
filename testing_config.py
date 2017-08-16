from flask_testing import TestCase
from application.app import app, db

class BaseTestConfig(TestCase):

    def create_app(self):
        app.config.from_object('config.TestingConfig')
        return app

    def setUp(self):
        self.app = self.create_app().test_client()
        # db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
