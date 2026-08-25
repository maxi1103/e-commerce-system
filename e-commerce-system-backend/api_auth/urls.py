from django.urls import path
from . import views

urlpatterns = [
    path('register', views.CreateUserView.as_view(),name="register"),
    path('clientes', views.ClienteListView.as_view(), name="clientes"),
]