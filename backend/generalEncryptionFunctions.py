#!/usr/bin/python3

import hashlib
import os
from generalfunctions import AuthException
from debug import debug
from base64 import *
import Crypto.Random
from Crypto import Random
from Crypto.Cipher import AES, PKCS1_OAEP
from Crypto.Hash import SHA512, SHA384, SHA256, SHA, MD5
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from cryptography.fernet import Fernet


SALT_SIZE = 16

path_to_file = os.getenv('FILES')
if path_to_file is None:
    path_to_file = os.path.dirname(os.path.abspath(__file__)) + "/data/"
else:
    path_to_file = path_to_file[5:]
path_to_public_keys = path_to_file + "publicKeys/pub_key_"
path_to_private_keys = path_to_file + "privateKeys/priv_key_"

def get_salt():
    return str(Crypto.Random.get_random_bytes(SALT_SIZE))


def generate_AES_key():
    return Fernet.generate_key()


# see link https://stackoverflow.com/questions/12524994/encrypt-decrypt-using-pycrypto-aes-256#comment75446564_21928790
class AESCipher(object):
    def __init__(self, key):
        self.key = hashlib.sha256(key).digest()

    def encrypt(self, raw):
        raw = self._pad(raw)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return b64encode(iv + cipher.encrypt(raw))

    def decrypt(self, enc):
        enc = b64decode(enc)
        iv = enc[:AES.block_size]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return self._unpad(cipher.decrypt(enc[AES.block_size:])).decode('utf-8')

    @staticmethod
    def _pad(s):
        return s + (AES.block_size - len(s) % AES.block_size) * chr(AES.block_size - len(s) % AES.block_size)

    @staticmethod
    def _unpad(s):
        return s[:-ord(s[len(s) - 1:])]


# encryptedpass = "hetsuppersterkpaswoord"
# https://stackoverflow.com/questions/51228645/how-can-i-encrypt-with-a-rsa-private-key-in-python
def newkeys(keysize):
    random_generator = Random.new().read
    key = RSA.generate(keysize, random_generator)
    private, public = key, key.publickey()
    return public, private


def importKey(externKey):
    return RSA.importKey(externKey)


def getpublickey(priv_key):
    return priv_key.publickey()


def encrypt(message, pub_key):
    # RSA encryption protocol according to PKCS#1 OAEP
    cipher = PKCS1_OAEP.new(pub_key)
    return cipher.encrypt(message)


def decrypt(ciphertext, priv_key):
    # RSA encryption protocol according to PKCS#1 OAEP
    cipher = PKCS1_OAEP.new(priv_key)
    return cipher.decrypt(ciphertext).decode('utf-8')


def sign(message, priv_key, hashAlg="SHA-256"):
    global hash
    hash = hashAlg
    signer = PKCS1_v1_5.new(priv_key)
    if (hash == "SHA-512"):
        digest = SHA512.new()
    elif (hash == "SHA-384"):
        digest = SHA384.new()
    elif (hash == "SHA-256"):
        digest = SHA256.new()
    elif (hash == "SHA-1"):
        digest = SHA.new()
    else:
        digest = MD5.new()
    digest.update(message.encode('utf-8'))
    return signer.sign(digest)


def verify(message, signature, pub_key):
    signer = PKCS1_v1_5.new(pub_key)
    if (hash == "SHA-512"):
        digest = SHA512.new()
    elif (hash == "SHA-384"):
        digest = SHA384.new()
    elif (hash == "SHA-256"):
        digest = SHA256.new()
    elif (hash == "SHA-1"):
        digest = SHA.new()
    else:
        digest = MD5.new()
    digest.update(message.encode('utf-8'))
    return signer.verify(digest, signature)

@debug
def full_encrypt(message: str, priv_sender, pub_receiver):
    """

    :param message:
    :param priv_sender:
    :param pub_receiver:
    :return: aes_encrypted_message, rsa_encrypted_aes_key, signature
    """
    aes_key = generate_AES_key()
    ciphter = AESCipher(aes_key)
    aes_encr_mess = ciphter.encrypt(message)
    encr_aes_key = encrypt(aes_key, pub_receiver)
    signature = b64encode(sign(message, priv_sender, "md-5"))
    return aes_encr_mess, encr_aes_key, signature

@debug
def full_decrypt(files: (), pub_sender, priv_receiver):
    """

    :param files:
    :param pub_sender:
    :param priv_receiver:
    :return: original_message or raises AuthException
    """
    aes_key = decrypt(files[1], priv_receiver)
    ciphter = AESCipher(aes_key.encode())
    orig_mess = ciphter.decrypt(files[0])
    if verify(orig_mess, b64decode(files[2]), pub_sender):
        return orig_mess
    else:
        raise AuthException("this message was not intended for you.")


def generate_keys(user_id, pass_word_hash):
    keys = newkeys(2048)
    #curpath = os.path.dirname(os.path.dirname(os.path.abspath(os.curdir)))
    pub_key_export = keys[0].exportKey("PEM")
    #file = open(curpath + path_to_public_keys + str(user_id) + ".pem", "wb+")
    file = open(path_to_public_keys + str(user_id) + ".pem", "wb+")

    file.write(pub_key_export)
    file.close()
    priv_key_exp = keys[1].exportKey("PEM", passphrase=pass_word_hash)
    #file = open(curpath + path_to_private_keys + str(user_id) + ".pem", "wb+")
    file = open(path_to_private_keys + str(user_id) + ".pem", "wb+")

    file.write(priv_key_exp)
    file.close()


def get_pub_key(user_id):
    #curpath = os.path.dirname(os.path.dirname(os.path.abspath(os.curdir)))
    file = open(path_to_public_keys + str(user_id) + ".pem", 'rb')
    pub_key = RSA.importKey(file.read())
    file.close()
    return pub_key


def get_priv_key(user_id, pass_word_hash):
    #curpath = os.path.dirname(os.path.dirname(os.path.abspath(os.curdir)))
    file = open(path_to_private_keys + str(user_id) + ".pem", 'rb')
    priv_key = RSA.importKey(file.read(), pass_word_hash)
    file.close()
    return priv_key


def get_keys(user_id, pass_word_hash):
    return get_pub_key(user_id), get_priv_key(user_id, pass_word_hash)


# if __name__ == "__main__":
#     print("----setup----")
#     message = "deze tekst wil ik encrypteren"
#     print("message", message)
#     aes_key = "dit is mn key"
#     ciphter = AESCipher(aes_key)
#     print("aes_key", aes_key)

#     print("----encryption----")
#     enc = ciphter.encrypt(message)
#     print("geincrypteerde text", enc)
#     rsa_keyA = newkeys(2048)
#     rsa_keyB = newkeys(2048)
#     encr_aes_key = encrypt(aes_key, rsa_keyB[0])
#     print("geincrypteerde aes key", encr_aes_key)
#     signature = b64encode(sign(message,rsa_keyA[1], "md-5"))
#     print("signature", signature)

#     print("----decryption----")
#     decr_aes_key = decrypt(encr_aes_key, rsa_keyB[1])
#     print("decrypteerde_aes_key", decr_aes_key)
#     cipher = AESCipher(decr_aes_key)
#     orig_message = cipher.decrypt(enc)
#     print("original_message", orig_message)
#     verify = verify(message, b64decode(signature), rsa_keyA[0])
#     print("veriffy", verify)

