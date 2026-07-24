from rest_framework import serializers 
from .models import Imagen,Producto,Categoria,SubCategoria,Medida

class ImagenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imagen
        fields = '__all__'

class MedidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medida
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    imagenes = ImagenSerializer(many=True, read_only=True)
    medida_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Medida.objects.all(), source='medidas', required=False
    )

    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'descripcion', 'precio', 'stock', 'categoria', 'subCategoria', 'medidas', 'medida_ids', 'masvendido', 'imagenes']

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class SubCategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategoria
        fields = '__all__'



