#this file is responsible for signing , encoding , decoding and returning jwt's.
import time

import jwt
from decouple import config

JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")

# This functions returns generated Tokens(JWTs)
def token_response(token:str):
    return {
        "access token" : token
    }

# Function used for signing the JWT String
def signJWT(userID:str):
    payload={
        "userID":userID,
        "expiry":time.time()+600
    }
    token = jwt.encode(payload,JWT_SECRET,algorithm = JWT_ALGORITHM)
    return token_response(token)

def decodeJWT(token:str):
    try:
        decode_token = jwt.decode(token,JWT_SECRET,algorithm = JWT_ALGORITHM)
        return decode_token if decode_token['expires'] >= time.time() else None
    except:
        return {}

#  Program for generating token 
# import secrets
# secrets.token_hex(16)
# '9492c568055229c6c68f988ef7a6b8fe'