#!/usr/bin/python3

import os
import sys
import logging
from User import User
from flask import Flask, jsonify, request, Response, make_response
from flask_cors import *
from flask_login import LoginManager, current_user, login_user, login_required, logout_user
from usermanager import get_all_users, get_user, post_user, put_user, delete_user, get_salt, get_list_of_users, check_username
from messagemanager import get_all_messages, get_message, get_my_messages, get_sent_messages, post_message, delete_message
import generalEncryptionFunctions

hard_code_origin = 'https://secure-messaging-platform.jocawebs.be'

origin = os.getenv('ORIGIN')
if origin is None:
    origin = hard_code_origin

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={
    r"/*": {"origins": [hard_code_origin + ":443/*"]}})

logging.getLogger('flask_cors').level = logging.DEBUG

app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.session_protection = "strong"


# logging
# sys.stdout = open('output.logs', 'w+')

# LOGIN
@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

@app.before_request
def check_post_request():
     if request.method == 'POST' and not request.is_json: 
        return jsonify({'bad_request_exception': 'only methods with json are allowed'}), 400

@app.errorhandler(404) 
def not_found(e): 
    return _build_cors_actual_response(jsonify({'error': 'Insert a valid api'})), 404

@app.errorhandler(401) 
def unauthorized(e): 
    return _build_cors_actual_response(jsonify({'error': 'Please login'})), 401

@app.route("/loggedin")
def loggedin():
    res = "false"
    if current_user.is_authenticated:
        res = "true"
    return _build_cors_actual_response(Response(res, status=200, mimetype='application/json'))



@app.route("/login", methods=['POST', 'OPTIONS'])
def call_login():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    if request.method == "POST":
        requestJson = request.get_json()
        username = requestJson["username"]
        password = requestJson["password"]
        users = get_list_of_users()
        res = "false"
        for user in users:
            if user.username == username and user.password == password:
                res = "true"
                login_user(user)
                break

        return _build_cors_actual_response(jsonify(res))


@app.route("/logout", methods=['POST', 'OPTIONS'])
@login_required
def call_logout():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    if request.method == "POST":
        logout_user()
        return _build_cors_actual_response(Response("true", status=200, mimetype='application/json'))


@app.route("/checkusername/<username>")
def call_check_username(username):
    return _build_cors_actual_response(Response(check_username(username), status=200, mimetype='application/json'))


@app.route("/salt")
def call_get_salt():
    return _build_cors_actual_response(jsonify(generalEncryptionFunctions.get_salt()))


@app.route("/salt/<username>")
def call_get_salt_by_username(username):
    return _build_cors_actual_response(get_salt(username))


@app.route("/users", methods=['GET', 'POST', 'OPTIONS'])
def call_users():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    if request.method == "GET":
        return _build_cors_actual_response(get_all_users())
    if request.method == "POST":
        return _build_cors_actual_response(post_user(request.get_json()))


@app.route("/users/<id>", methods=['GET', 'PUT','DELETE', 'OPTIONS'])
@login_required
def call_user(id):
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    if request.method == "GET":
        return _build_cors_actual_response(get_user(id))
    if request.method == "PUT":
        return _build_cors_actual_response(put_user(id, request.get_json()))
    if request.method == "DELETE":
        return _build_cors_actual_response(delete_user(id))


@app.route("/users/me", methods=['GET', 'PUT', 'DELETE', 'OPTIONS'])
@login_required
def call_user_me():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    if request.method == "GET":
        return _build_cors_actual_response(get_user(current_user.id))
    if request.method == "PUT":
        return _build_cors_actual_response(put_user(current_user.id, request.get_json()))
    if request.method == "DELETE":
        return _build_cors_actual_response(delete_user(current_user.id))


# MESSAGE

@app.route("/messages", methods=['POST', 'OPTIONS'])
@login_required
def call_messages():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    if request.method == "POST":
        return _build_cors_actual_response(post_message(request.get_json(), current_user.id))


@app.route("/messages/<id>", methods=['DELETE', 'OPTIONS'])
@login_required
def call_delete_message(id):
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    if request.method == "DELETE":
        return _build_cors_actual_response(delete_message(id))


@app.route("/messages/me", methods=['GET', 'OPTIONS'])
@login_required
def call_message_me():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    if request.method == "GET":
        return _build_cors_actual_response(get_my_messages(current_user.id))


@app.route("/messages/sent/me", methods=['GET', 'OPTIONS'])
@login_required
def call_messages_sent_me():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    if request.method == "GET":
        return _build_cors_actual_response(get_sent_messages(current_user.id))


def _build_cors_prelight_response():
    response = make_response()
    response.headers["Access-Control-Allow-Origin"] = origin
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['content-type'] = 'application/json'
    response.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    return response

def _build_cors_actual_response(response):
    response.headers['Access-Control-Allow-Origin'] = origin
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response


if __name__ == "__main__":
    os.environ["FILES"] = "../../backend/public/"
    app.run(debug=True)
