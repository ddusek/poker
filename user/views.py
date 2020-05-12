import pdb

import bcrypt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from user.models import User
from user.serializers import UserSerializer, UserSerializerChecker


def hash_pw(password, salt=bcrypt.gensalt(12)):
    password = password.encode('utf-8')
    if type(salt) == str:
        salt = bytes(salt, encoding='utf-8')
    return {'pw': bcrypt.hashpw(password, salt).decode('utf-8'), 'salt': salt.decode('utf-8')}


class CreateUserView(APIView):
    def post(self, request, format=None):
        if 'username' not in request.data['body'] or 'password' not in request.data['body']:
            res = {'status': 400, 'msg': 'didnt receive username or password'}
            return Response(res, status=status.HTTP_400_BAD_REQUEST)
        username = request.data['body']['username']
        if User.objects.filter(username=username).exists():
            res = {'status': 409, 'msg': 'username already exists'}
            return Response(res, status=status.HTTP_409_CONFLICT)
        password = hash_pw(request.data['body']['password'])
        user = User.objects.create_user(username=username, password=password)
        user_serializer = UserSerializer(user)
        res = {'status': 201, 'msg': 'user created successfully', 'user': user_serializer.data}
        return Response(res, status=status.HTTP_201_CREATED)


class LoginUserView(APIView):
    def post(self, request, format=None):
        if 'username' not in request.data['body'] or 'password' not in request.data['body']:
            res = {'status': 401, 'msg': 'didnt receive username or password'}
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)

        username = request.data['body']['username']
        user = User.objects.filter(username=username).first()
        if not user:
            res = {'status': 401, 'msg': 'didnt receive username or password'}
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)

        user_serializer = UserSerializerChecker(user)

        # if password match, login
        if bcrypt.checkpw(request.data['body']['password'].encode('utf-8'),
                          user_serializer.data['pw_hash'].encode('utf-8')):
            user_response = UserSerializer(user)
            res = {'status': 200, 'msg': 'login successfully', 'user': user_response.data}
            return Response(res, status=status.HTTP_200_OK)

        res = {'status': 401, 'msg': 'wrong username or password'}
        return Response(res, status=status.HTTP_401_UNAUTHORIZED)
