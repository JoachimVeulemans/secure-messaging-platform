#!/usr/bin/python3

from typing import Tuple
from generalfunctions import generate_id, is_valid_email, EmailException, is_valid_id, IDException
import datetime


class Message:
    id: str
    sender: str
    receiver: str
    title: str
    content: str
    timeSend: datetime
    timeRead: datetime
    file: (str, str)

    def __init__(self, id: str = "", sender: str = "", receiver: str = "", title: str = "", content: str = "",
                 timeSend: str = "", timeRead: str = "", file: Tuple[str, str] = ("", "")):
        # if not is_valid_id(id):
        #     raise IDException()
        self.file = file
        self.id = id
        # if not is_valid_id(sender):
        #     raise IDException()
        self.sender = sender
        # if not is_valid_id(receiver):
        #     raise IDException()
        self.receiver = receiver
        self.title = title
        self.content = content
        self.timeSend = timeSend
        self.timeRead = timeRead

    def as_dict(self):
        return {
            "_id": self.id,
            "sender": self.sender,
            "receiver": self.receiver,
            "title": self.title,
            "content": self.content,
            "timeSend": self.timeSend,
            "timeRead": self.timeRead,
            "file": self.file
        }


def as_new_message(data):
    id = generate_id()
    return Message(id, data['sender'], data['receiver'], data['title'], data['content'], data['timeSend'],
                   data['timeRead'], (data['file'][0], data['file'][1]))


def as_existing_message(data):
    return Message(data['id'], data['sender'], data['receiver'], data['title'], data['content'], data['timeSend'],
                   data['timeRead'], (data['file'][0], data['file'][1]))
