from rest_framework import serializers 
from .models import Imagen,Producto,Categoria,SubCategoria,Medida

class ImagenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imagen
        fields = '__all__'  # Incluye los campos que deseas exponer

class MedidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medida
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    imagenes = ImagenSerializer(many=True, read_only=True)  # Incluye las imágenes relacionadas
    medidas= MedidaSerializer(many=True, read_only=True)

    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'descripcion', 'precio', 'stock', 'categoria', 'subCategoria', 'medidas', 'masvendido', 'imagenes']

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class SubCategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategoria
        fields = '__all__'



