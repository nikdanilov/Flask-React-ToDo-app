from flask import request, render_template, jsonify, url_for, redirect, g
from .models import User
from .models import Task
from index import app, db
import json
import datetime
from sqlalchemy.exc import IntegrityError
from .utils.auth import generate_token, requires_auth, verify_token


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')


@app.route("/api/username", methods=["GET"])
@requires_auth
def get_user():
    return jsonify(result=g.current_user)


@app.route("/api/users_tasks", methods=["GET"])
@requires_auth
def get_users_tasks():
    r = Task.query.filter_by(user_id=g.current_user["id"]).all()
    return jsonify(result=[i.serialize for i in r])


@app.route("/api/create_user", methods=["POST"])
def create_user():
    incoming = request.get_json()
    user = User(
        email=incoming["email"],
        password=incoming["password"]
    )
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="User with that email already exists"), 403

    new_user = User.query.filter_by(email=incoming["email"]).first()

    return jsonify(
        id=user.id,
        token=generate_token(new_user)
    )


@app.route("/api/create_task", methods=["POST"])
@requires_auth
def create_task():
    incoming = request.get_json()
    task = Task(
        user_id = g.current_user["id"],
        name=incoming["name"],
        category=incoming["category"]
    )
    db.session.add(task)

    try:
        db.session.commit()
    except Exception:
        return jsonify(message=Exception), 500

    return jsonify(message=incoming["name"] + " started."), 200

@app.route("/api/stop_task", methods=["POST"])
@requires_auth
def stop_task():
    incoming = request.get_json()
    update = Task.query.filter_by(id=incoming["id"]).update({"dt_finish": datetime.datetime.now()})

    if update: 
        db.session.commit()
        return jsonify(message="Task #" + str(incoming["id"]) + " stopped."), 200
    else:
        return jsonify(message="Unable to update record."), 500


@app.route("/api/get_token", methods=["POST"])
def get_token():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"])
    if user:
        return jsonify(token=generate_token(user))

    return jsonify(error=True), 403


@app.route("/api/is_token_valid", methods=["POST"])
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming["token"])

    if is_valid:
        return jsonify(token_is_valid=True)
    else:
        return jsonify(token_is_valid=False), 403
