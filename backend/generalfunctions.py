#!/usr/bin/python3

import re
from json import JSONEncoder
from bson import ObjectId


def generate_id():
    return ObjectId()

def json(value=None, status=1, key="success"):
    value = {} if value is None else value
    value["_status"] = status
    value["_key"] = key
    return JSONEncoder().encode(value)


def is_valid_email(email):
    if email is None:
        return False

    return re.fullmatch(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b', email) is not None


def is_valid_alphanumeric_string(text):
    if text is None:
        return False
    if not isinstance(text, str):
        return False

    return re.fullmatch(r'\b[A-Za-z0-9._-]+\b', text) is not None


def is_valid_alphanumeric_string_no_dot(text):
    if text is None:
        return False
    if not isinstance(text, str):
        return False

    return re.fullmatch(r'\b[A-Za-z0-9_-]+\b', text) is not None


def is_valid_alphanumeric_string_no_special_char(text):
    if text is None:
        return False
    if not isinstance(text, str):
        return False

    return re.fullmatch(r'\b[A-Za-z0-9]+\b', text) is not None


def is_valid_alphanumeric_string_with_space(text):
    if text is None:
        return False
    if not isinstance(text, str):
        return False

    return re.fullmatch(r'\b[A-Za-z0-9 ._-]+\b', text) is not None


def clean_string(text):
    return re.sub(r'[^a-zA-Z0-9\ ]', '', text)


def clean_string_for_url(text):
    text = str.replace(text, " ", "_")
    return re.sub(r'[^a-zA-Z0-9\-_]', '', text)


def is_valid_id(ID):
    # TODO: improve for objectId
    return is_valid_alphanumeric_string_no_special_char(str(ID))


def convert_if_valid_id(ID):
    if (not is_valid_id(ID)):
        raise IDException
    return ObjectId(ID)


def is_valid_strid(string_identifier):
    return isinstance(string_identifier, str)


def is_valid_bool(value):
    return isinstance(value, bool)


def is_valid_lang(lang):
    return lang is None or (isinstance(lang, str) and len(lang) < 5)


### EXCEPTIONS ###

class CreationException(Exception):
    pass


class PasswordException(Exception):
    pass


class EmailException(Exception):
    pass


class IDException(Exception):
    pass


class KeyException(Exception):
    pass


class ValueException(Exception):
    pass


class LangException(Exception):
    pass


class AccountException(Exception):
    pass


class NameException(Exception):
    pass


class TitleException(Exception):
    pass


class DescriptionException(Exception):
    pass


class AccessException(Exception):
    pass


class CompanyException(Exception):
    pass


class DateException(Exception):
    pass


class LocationException(Exception):
    pass


class ImageException(Exception):
    pass


class StridException(Exception):
    pass


class DatabaseUpdateException(Exception):
    pass


class NotFoundException(Exception):
    pass


class LevelException(Exception):
    pass


class SizeException(Exception):
    pass


class StructureException(Exception):
    pass


class AuthException(Exception):
    pass
