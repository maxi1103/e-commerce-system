from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from .serializers import (
    UserRegisterSerializer, ClienteListSerializer,
    ClienteMeSerializer, ClienteDetailSerializer
)

User = get_user_model()


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]


class MeView(generics.RetrieveUpdateAPIView):
    serializer_class = ClienteMeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class ClienteListView(generics.ListAPIView):
    queryset = User.objects.filter(is_staff=False)
    serializer_class = ClienteListSerializer
    permission_classes = [IsAdminUser]


class ClienteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.filter(is_staff=False)
    serializer_class = ClienteDetailSerializer
    permission_classes = [IsAdminUser]
