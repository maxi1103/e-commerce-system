from django.http import JsonResponse
from .models import Producto,Categoria,SubCategoria,Medida,Imagen
from .serializers import ProductoSerializer,CategoriaSerializer,SubCategoriaSerializer,MedidaSerializer, ImagenSerializer
from rest_framework import generics,viewsets,status
from rest_framework.views import APIView
from rest_framework.response import Response
from eCommerce.permissions import IsAdminUserOrReadOnly

def index(request):
    context = {
        'status':True,
        'content':'Api Rest con Django'
    }
    
    return JsonResponse(context)

class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()
    permission_classes = [IsAdminUserOrReadOnly]

class CategoriaView(viewsets.ModelViewSet):
    serializer_class = CategoriaSerializer
    queryset = Categoria.objects.all()
    permission_classes = [IsAdminUserOrReadOnly]

class SubCategoriaView(viewsets.ModelViewSet):
    serializer_class = SubCategoriaSerializer
    queryset = SubCategoria.objects.all()
    permission_classes = [IsAdminUserOrReadOnly]

class MedidaView(viewsets.ModelViewSet):
    serializer_class = MedidaSerializer
    queryset = Medida.objects.all() 
    permission_classes = [IsAdminUserOrReadOnly]
class ImagenView(viewsets.ModelViewSet):
    serializer_class = ImagenSerializer
    queryset = Imagen.objects.all()
    permission_classes = [IsAdminUserOrReadOnly]
# class ProductoView(APIView):
#     def get(self,request):
#         data= Producto.objects.all()
#         ser_data=ProductoSerializer(data,many=True)
#         return Response(ser_data.data)
#     def post(self,request):
#         ser_data=ProductoSerializer(data=request.data)
#         ser_data.is_valid(raise_exception=True)
#         ser_data.save()
#         return Response(ser_data.data)

# class CategoriaView(generics.ListCreateAPIView):
#     queryset = Categoria.objects.all()
#     serializer_class = CategoriaSerializer