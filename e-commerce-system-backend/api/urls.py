from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('Producto', views.ProductoView.as_view())
    
    
]