from django.urls import path,include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'productos', views.ProductoView, basename='producto')
router.register(r'categorias', views.CategoriaView, basename='categoria')
router.register(r'subcategorias', views.SubCategoriaView, basename='subcategoria')
router.register(r'medidas', views.MedidaView, basename='medida')
router.register(r'imagenes', views.ImagenView, basename='imagen')
urlpatterns = [
    path('', views.index),
    path('api/', include(router.urls))
]