from django.urls import path
from . import views

urlpatterns = [
    path('register', views.CreateUserView.as_view(), name="register"),
    path('me', views.MeView.as_view(), name="me"),
    path('clientes', views.ClienteListView.as_view(), name="clientes"),
    path('clientes/<int:pk>', views.ClienteDetailView.as_view(), name="cliente-detail"),
]
