#from .models import Cliente
from django.contrib.auth import get_user_model
from rest_framework import generics
from .serializers import UserRegisterSerializer, ClienteListSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

User = get_user_model()

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]

class ClienteListView(generics.ListAPIView):
    queryset = User.objects.filter(is_staff=False)
    serializer_class = ClienteListSerializer
    permission_classes = [IsAdminUser]
