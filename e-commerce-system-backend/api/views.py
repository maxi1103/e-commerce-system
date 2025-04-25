from django.http import JsonResponse
from .models import Producto,Categoria,SubCategoria,Medida,Imagen
from .serializers import ProductoSerializer,CategoriaSerializer,SubCategoriaSerializer,MedidaSerializer, ImagenSerializer
from rest_framework import generics,viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
import os
from django.conf import settings

def index(request):
    context = {
        'status':True,
        'content':'Api Rest con Django'
    }
    
    return JsonResponse(context)

class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

    def create(self, request, *args, **kwargs):
        # Verificar si se envió una imagen
        image = request.FILES.get('image')
        if image:
            # Ruta donde se guardará la imagen (en la carpeta del frontend)
            frontend_assets_path = os.path.join(settings.BASE_DIR, '../e-commerce-system-frontend/src/assets')
            os.makedirs(frontend_assets_path, exist_ok=True)  # Crear la carpeta si no existe

            # Guardar la imagen
            image_path = os.path.join(frontend_assets_path, image.name)
            with open(image_path, 'wb') as f:
                for chunk in image.chunks():
                    f.write(chunk)

            # Construir la URL relativa para guardar en la base de datos
            image_url = f"/assets/{image.name}"
        else:
            image_url = None

        # Crear el producto con la URL de la imagen
        data = request.data.copy()
        data['imagenes'] = image_url
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CategoriaView(viewsets.ModelViewSet):
    serializer_class = CategoriaSerializer
    queryset = Categoria.objects.all()

class SubCategoriaView(viewsets.ModelViewSet):
    serializer_class = SubCategoriaSerializer
    queryset = SubCategoria.objects.all()

class MedidaView(viewsets.ModelViewSet):
    serializer_class = MedidaSerializer
    queryset = Medida.objects.all() 
class ImagenView(viewsets.ModelViewSet):
    serializer_class = ImagenSerializer
    queryset = Imagen.objects.all()
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