#from .models import Cliente
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserRegisterSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]

