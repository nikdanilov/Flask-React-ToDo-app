from index import db, bcrypt
import json
import datetime

class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __init__(self, email, password):
        self.active = True
        self.email = email
        self.password = User.hashed_password(password)

    @staticmethod
    def hashed_password(password):
        return bcrypt.generate_password_hash(password)

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None

class Task(db.Model):

    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(255))
    category = db.Column(db.String(255))
    dt_start = db.Column(db.TIMESTAMP)
    dt_finish = db.Column(db.TIMESTAMP)

    def __init__(self, user_id, category, name):
        self.user_id = user_id
        self.name = name
        self.category = category
        self.dt_start = datetime.datetime.now()

    @property
    def serialize(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

