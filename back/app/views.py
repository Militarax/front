from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from app.tasks import spider_cap
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from app.models import Profile
from .serializers import UserListSerializer, UserUpdateSerializer, UserCreateSerializer, MyTokenObtainPairSerializer, AllResultsSerializer
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_226_IM_USED, HTTP_403_FORBIDDEN

count = 0

class UserList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class UserDelete(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class UserCreate(generics.CreateAPIView):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class UserUpdate(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer


class UserDetail(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class RegisterUser(APIView):
    permission_classes = [AllowAny, ]

    def post(self, request, *args, **kwargs):
        user = request.data
        serializer = UserCreateSerializer(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_201_CREATED)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class start_crawler(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        list_of_filters = [filt for filt in request.data]
        print(list_of_filters)
        spider_cap.delay(list_of_filters)
        return Response({'The spider is crawling'})


class AllResults(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AllResultsSerializer
    queryset = Profile.objects.all()

