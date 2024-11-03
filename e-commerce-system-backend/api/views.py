from django.http import JsonResponse
from .models import Producto,Categoria
from .serializers import ProductoSerializer,CategoriaSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response


def index(request):
    context = {
        'status':True,
        'content':'Api Rest con Django'
    }
    
    return JsonResponse(context)

class ProductoView(APIView):
    def get(self,request):
        data= Producto.objects.all()
        ser_data=ProductoSerializer(data,many=True)
        return Response(ser_data.data)
    def post(self,request):
        ser_data=ProductoSerializer(data=request.data)
        ser_data.is_valid(raise_exception=True)
        ser_data.save()
        return Response(ser_data.data)

class CategoriaView(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer