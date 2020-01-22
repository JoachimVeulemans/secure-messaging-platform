#!/usr/bin/python3

import json
import os
from Message import *
from fileManager import FileReader, FileWriter
from generalEncryptionFunctions import full_encrypt, get_priv_key, get_pub_key, full_decrypt
from generalfunctions import is_valid_id, IDException
from flask import jsonify, Response
from json_encoder import JSONEncoder
from usermanager import get_user_pass_hash


path_to_file = os.getenv('FILES')
if path_to_file is None:
    path_to_file = os.path.dirname(os.path.abspath(__file__)) + "/data/"
path_to_file += "messages.txt"


def get_all_messages():
    messages = []
    fileReader = FileReader(path_to_file)
    for message_attributes in fileReader.read_words_by_line(","):
        if not is_valid_id(message_attributes[0]):
            raise IDException
        messages.append(
            Message(message_attributes[0], message_attributes[1], message_attributes[2], message_attributes[3],
                    message_attributes[4], message_attributes[5], message_attributes[5], (message_attributes[6],message_attributes[7])).as_dict())
    return jsonify(messages)


def get_message(id):
    if is_valid_id(id):

        fileReader = FileReader(path_to_file)
        for message_attributes in fileReader.read_words_by_line(","):
            message_id = message_attributes[0]
            if not is_valid_id(message_id):
                raise IDException

            if message_id == id:
                return jsonify(Message(message_attributes[0], message_attributes[1], message_attributes[2],
                               message_attributes[3], message_attributes[4], message_attributes[5],
                               message_attributes[5], (message_attributes[6],message_attributes[7])).as_dict())

    else:
        raise IDException()


def get_my_messages(id):
    messages = []

    if is_valid_id(id):
        fileReader = FileReader(path_to_file)
        for json_mess in fileReader.get_json():
            if not is_valid_id(json_mess["_id"]) or not is_valid_id(json_mess["receiver"]) or not is_valid_id(json_mess["sender"]):
                raise IDException

            if json_mess["receiver"] == id:
                pub_sender = get_pub_key(json_mess["sender"])
                priv_receiver = get_priv_key(json_mess["receiver"], get_user_pass_hash(json_mess["receiver"]))
                messages.append(decrypt_full_message(json_mess, pub_sender, priv_receiver).as_dict())
        return jsonify(messages)
    else:
        raise IDException()


def get_sent_messages(id):
    if is_valid_id(id):
        messages=[]

        fileReader = FileReader(path_to_file)
        for json_mess in fileReader.get_json():
            message_id = json_mess["_id"]
            if not is_valid_id(message_id) or not is_valid_id(json_mess["receiver"]) or not is_valid_id(json_mess["sender"]):
                raise IDException

            if json_mess["sender"] == id:
                # TODO dit is niet goed!!! gebruikt wachtwoord dat niet van deze persoon is!!!
                # print("!!! TODO Gebruikt paswoord dan niet van deze persoon is !!! \n Hoe lossen we dit op!?!?!?!")
                pub_sender = get_pub_key(id)
                priv_receiver = get_priv_key(json_mess["receiver"], get_user_pass_hash(json_mess["receiver"]))
                messages.append(decrypt_full_message(json_mess, pub_sender, priv_receiver).as_dict())
        return jsonify(messages)
    else:
        raise IDException()


def post_message(data, sender_id):
    filewriter = FileWriter(path_to_file)
    data["sender"] = sender_id
    message = as_new_message(data)
    sender_pass = get_user_pass_hash(sender_id)
    sender_priv_key = get_priv_key(sender_id, sender_pass)
    receiver_id = data["receiver"]
    receiver_pub_key = get_pub_key(receiver_id)
    files = encode_full_message(message, sender_priv_key, receiver_pub_key)
    full_encrypt_message_files = {
        "_id": str(message.id),
        "sender": str(sender_id),
        "receiver": str(message.receiver),
        "aes_encrypted_json_message": files[0].hex(),
        "rsa_encrypted_aes_key": files[1].hex(),
        "signature": files[2].hex(),
        "timeSend": str(message.timeSend),
        "timeRead": str(message.timeRead)
    }
    filewriter.write_lines(json.dumps(full_encrypt_message_files))
    return jsonify({"id": str(message.id)})


def delete_message(id):
    if id == "undefined":
        raise IDException
    message_file = open(path_to_file, "r")
    lines = message_file.readlines()
    message_file = open(path_to_file, "w")
    for line in lines:
        json_mess = json.loads(line)
        message_id = json_mess["_id"]
        if message_id != id:
            message_file.write(line)
    return jsonify({'success': 'ok'})


def decrypt_full_message(encr_json_mess, pub_sender, priv_receiver):
    files = bytes.fromhex(encr_json_mess['aes_encrypted_json_message']), bytes.fromhex(encr_json_mess['rsa_encrypted_aes_key']), bytes.fromhex(encr_json_mess['signature'])
    original_mess = json.loads(full_decrypt(files, pub_sender, priv_receiver))
    message_obj = Message(encr_json_mess["_id"], encr_json_mess["sender"], encr_json_mess["receiver"], original_mess["title"], original_mess["content"],
                          encr_json_mess["timeSend"], encr_json_mess["timeRead"], original_mess["file"])
    return message_obj


def encode_full_message(message: Message, sender_priv_key, receiver_pub_key):
    json_message = json.dumps({"title": message.title, "content": message.content, "file": message.file})
    return full_encrypt(json_message, sender_priv_key, receiver_pub_key)


# if __name__ == "__main__":
#     pub_sender = get_pub_key("5cc0b2748ac05f7d6e64a9c3")
#     priv_receiver = get_priv_key("5cc0b2678ac05f7d6e64a9c2", get_user_pass_hash("5cc0b2678ac05f7d6e64a9c2"))
#     encr_json_mess = {"_id": "5ccdf2528ac05f2c97d09b08", "sender": "5cc0b2748ac05f7d6e64a9c3", "receiver": "5cc0b2678ac05f7d6e64a9c2", "aes_encrypted_json_message": "43544f3070534563614255474d78734d7a7a4d5062356b6e6f492f5169334b7651432b716b594d512b743535635232495969425a4363332b397146714b5851426c694255324632363143585274522b5a6744553668773d3d", "rsa_encrypted_aes_key": "570f31cebdebc51a4130563cdd881de9fdf8a102de5750d5f04941ce6f3e69d6d68231ecd74170ea18a6cad75f00adce8dd9c7e429d840d0b092e0f76a3feb74bf24b64540971f136f4aeedd2f9241080f9829afeb3cf91d987cda07fd6c4f121c425f7086935f8e255157cfd74897dac1916a2062ecc2fa6cda25336a1d4679841ba5b9adb72d467d162e20bb660923b7a4edf2b57f677247c68b0390e082eb4c7f905594d8d47beeebdb48d58ca2da29f23a8ebfa505af00028c5495d1b4a7c5f2f7bea7b9ece65bc1a5822499b28e8662ba8b066c7e0b04206c8c2ea4254604efb03ad0cff73febd824cd8e72660a9ec4af2ea15af5429104ffc76e29002d", "signature": "4b795354722b376c385465642f68723445336351327a6972565945746551704e4936624b70547256695047386b673746594e505247526b73322b6c745a49513946727a644f6d6a523357544f6674312b5a344474644d4234394d69654647775933586f355a44386947324332795062365a4d653041667951375134326a614442475a506e462b483238745a42624a47494b4156316c387a58656a377a4d4976304c5a50683279686b4649736c3645592b366866666d487566565057496f3956306463632b486f554f76454c56416873676c46776a59484459346e5a6e6f592f47747970705167466f2b664e4f4e68416e74444e6d595a2f2f75753774774965432b6f4975454c4231637677467963427057374258374f334845636e66655231474d31772f6558762b492b4c694b4a35744a6b73307871323574494d306d2b41366e34596a7a6e2b316f3450502f486f35502f6b536f413d3d", "timeSend": "2019-05-04T20:13:03.077Z", "timeRead": "2019-05-04T20:13:03.077Z", "file": "('', '')"}
#     print(decrypt_full_message(encr_json_mess, pub_sender,priv_receiver).as_dict())
#     print("test2:", get_sent_messages("5cc0b2748ac05f7d6e64a9c3"))
