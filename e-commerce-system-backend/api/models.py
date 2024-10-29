from django.db import models

# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(max_length=30)
    descripcion = models.TextField(null=True)
    precio = models.DecimalField(decimal_places=2)
    stock = models.IntegerField(default=0)
    imagenes = models.CharField(max_length=300)

class Categoria(models.Model):
    nombre = models.CharField(max_length=30)
    descripcion = models.TextField(null=True)
