#!/usr/bin/python3

import json
import os
from User import *
from fileManager import FileReader, FileWriter
from flask import jsonify, Response
from generalfunctions import is_valid_id, IDException, generate_id


path_to_file = os.getenv('FILES')
if path_to_file is None:
    path_to_file = os.path.dirname(os.path.abspath(__file__)) + "/"
path_to_file += "users.txt"

def get_user(id: str):
    if is_valid_id(id):

        fileReader = FileReader(path_to_file)
        for user_attributes in fileReader.read_words_by_line(","):
            user_id = user_attributes[0]
            if not is_valid_id(user_id):
                raise IDException

            if user_id == id:
                return jsonify(User(user_attributes[0], user_attributes[1], user_attributes[2],
                                    user_attributes[3], user_attributes[4]).as_dict())

    else:
        raise IDException()


def get_salt(username: str):
    fileReader = FileReader(path_to_file)
    for user_attributes in fileReader.read_words_by_line(","):
        username_db = user_attributes[1]
        if username_db == username:
            if user_attributes[6][-1] == '\n':
                return jsonify(user_attributes[6][:-1])
            return jsonify(user_attributes[6])


def get_user_pass_hash(id: str):
    fileReader = FileReader(path_to_file)
    for user_attributes in fileReader.read_words_by_line(","):
        user_id = user_attributes[0]
        if not is_valid_id(user_id):
            raise IDException

        if user_id == id:
            return user_attributes[5]

    else:
        raise IDException()


def get_all_users():
    users = []
    fileReader = FileReader(path_to_file)
    for user_attributes in fileReader.read_words_by_line(","):
        if not is_valid_id(user_attributes[0]):
            raise IDException
        users.append(
            User(user_attributes[0], user_attributes[1], user_attributes[2], user_attributes[3],
                 user_attributes[4]).as_dict())
    return jsonify(users)


def get_list_of_users():
    users = []
    fileReader = FileReader(path_to_file)
    for user_attributes in fileReader.read_words_by_line(","):
        if not is_valid_id(user_attributes[0]):
            raise IDException
        users.append(
            User(user_attributes[0], user_attributes[1], user_attributes[2], user_attributes[3],
                 user_attributes[4], user_attributes[5]))
    return users



def post_user(data):
    filewriter = FileWriter(path_to_file)
    user = as_new_user(data)
    filewriter.write_lines([str(user.id) + "," + str(user.username) + "," + str(user.firstname) + "," + str(user.lastname) + "," + str(
            user.email) + "," + str(user.password) + "," + str(user.salt)])
    return jsonify({"id": str(user.id)})


def put_user(id, data):
    data["id"] = id
    user = as_existing_user(data)
    user_file = open(path_to_file, "r")
    lines = user_file.readlines()
    user_file = open(path_to_file, "w")
    for line in lines:
        user_attributes = line.split(',')
        user_id = user_attributes[0]
        if user_id != id:
            user_file.write(line)
        else:
            user_file.write(
                id + "," + str(user.username) + "," + str(user.firstname) + "," + str(user.lastname) + "," + str(
                    user.email) + "," + user_attributes[5] + "," + user_attributes[6])
    return jsonify({'success': 'ok'})


def delete_user(id):
    user_file = open(path_to_file, "r")
    lines = user_file.readlines()
    user_file = open(path_to_file, "w")
    for line in lines:
        user_attributes = line.split(',')
        user_id = user_attributes[0]
        if user_id != id:
            user_file.write(line)
    return jsonify({'success': 'ok'})


def check_username(username):
    fileReader = FileReader(path_to_file)
    for user_attributes in fileReader.read_words_by_line(","):
        if not is_valid_id(user_attributes[0]):
            raise IDException
        if username == user_attributes[1]:
            return "false"
    return "true"
