#!/usr/bin/python3

import os
from time import sleep
from fileManager import FileReader
from flask_login import UserMixin
from generalEncryptionFunctions import newkeys, generate_keys, get_keys, full_encrypt, get_pub_key, full_decrypt, get_priv_key
from generalfunctions import generate_id, is_valid_email, EmailException, is_valid_id, IDException


path_to_file = os.getenv('FILES')
if path_to_file is None:
    path_to_file = os.path.dirname(os.path.abspath(__file__)) + "/"
path_to_file += "users.txt"

class User(UserMixin):
    id: str
    username: str
    firstname: str
    lastname: str
    email: str
    password: str

    def __init__(self, id: str = "", username: str = "", firstname: str = "", lastname: str = "", email: str = "",
                 password: str = "", salt: str = ""):
        # if not is_valid_id(id):
        #     raise IDException()
        self.id = id
        self.username = username
        self.firstname = firstname
        self.lastname = lastname
        # if not is_valid_email(email):
        #     raise EmailException
        self.email = email
        self.password = password
        self.salt = salt

    def as_dict(self):
        return {
            "_id": self.id,
            "username": self.username,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email,
            "password": self.password,
            "salt": self.salt
        }

    def get_private_key(self):
        raise NotImplementedError

    def get_public_key(self, user_id):
        raise NotImplementedError

    @staticmethod
    def get(id: str):
        if is_valid_id(id):

            fileReader = FileReader(path_to_file)
            for user_attributes in fileReader.read_words_by_line(","):
                user_id = user_attributes[0]
                if not is_valid_id(user_id):
                    raise IDException

                if user_id == id:
                    return User(user_attributes[0], user_attributes[1], user_attributes[2],
                                        user_attributes[3], user_attributes[4], user_attributes[5])

        else:
            raise IDException()


def as_new_user(data):
    id = generate_id()
    generate_keys(id, data['password'])
    return User(id, data['username'], data['firstname'], data['lastname'], data['email'], data['password'], data['salt'])


def as_existing_user(data):
    return User(data['id'], data['username'], data['firstname'], data['lastname'], data['email'], data['password'], data['salt'])


# if __name__ == "__main__":
#     sender = as_new_user({"username": "sender", "firstname": "firstnametest", "lastname": "lastnametest", "email": "emailtest@email.com", "password": "passwordtest", "salt": "salt"})
#     receiver = as_new_user({"username": "receiver", "firstname": "firstnametest", "lastname": "lastnametest", "email": "emailtest@email.com", "password": "receiverpasswordtest", "salt": "salt"})
#     sleep(2)
#     keys_sender = get_keys(sender.id, sender.password)
#     pub_key_receiver = get_pub_key(receiver.id)
#
#     files = full_encrypt("deze message wil ik encrypteren.", keys_sender[1], pub_key_receiver)
#
#     pub_send = get_pub_key(sender.id)
#     priv_receiver = get_priv_key(receiver.id, receiver.password)
#     message = full_decrypt(files, pub_send, priv_receiver)
#     print(message)

