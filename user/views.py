import bcrypt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from user.models import User
from user.serializers import UserSerializer, UserSerializerChecker


def hash_pw(password, salt=bcrypt.gensalt(12)):
    """Hash password with bcrypt.

    :param password: password to hash
    :param salt: salt for hash, defaults to bcrypt.gensalt(12)
    :return: hashed password
    """
    password = password.encode('utf-8')
    if isinstance(salt, str):
        salt = bytes(salt, encoding='utf-8')
    return {'pw': bcrypt.hashpw(password, salt).decode('utf-8'), 'salt': salt.decode('utf-8')}


class CreateUserView(APIView):
    """User view for creating user.
    """
    def post(self, request):
        """Create new user from form data.
        """
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
    """User view for log in.
    """
    def post(self, request):
        """Check if user is authenticated and log in.
        """
        if 'username' not in request.data['body'] or 'password' not in request.data['body']:
            res = {'status': 401, 'msg': 'didnt receive username or password'}
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        username = request.data['body']['username']
        user = User.objects.filter(username=username).first()
        if not user:
            res = {'status': 401, 'msg': 'wrong username or password'}
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        user_serializer = UserSerializerChecker(user)

        # if password match, login
        if bcrypt.checkpw(request.data['body']['password'].encode('utf-8'),
                          user_serializer.data['pw_hash'].encode('utf-8')):

            # save user id to session
            user_response = UserSerializer(user)
            request.session['user_id'] = user_response.data['id']

            res = {'status': 200, 'msg': 'logged in successfully'}
            return Response(res, status=status.HTTP_200_OK)

        res = {'status': 401, 'msg': 'wrong username or password'}
        return Response(res, status=status.HTTP_401_UNAUTHORIZED)


class UserLoggedInView(APIView):
    """User view checking if user is logged in.

    :param APIView: [description]
    :type APIView: [type]
    """
    def get(self, request):
        """Check if user is saved in session
        """
        if 'user_id' not in request.session:
            res = 'user not logged in'
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)

        res = request.session['user_id']
        return Response(res, status=status.HTTP_200_OK)


class CurrentUserIDView(APIView):
    """User view for getting userID
    """
    def get(self, request):
        """get user_id from session
        """
        if 'user_id' not in request.session:
            res = {
                'success': 'false',
                'user_id': None
            }
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        res = {
            'success': 'true',
            'user_id': request.session['user_id']
        }
        return Response(res, status=status.HTTP_200_OK)
