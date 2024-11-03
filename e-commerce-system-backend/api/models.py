from django.db import models
#from api_auth.models import Cliente
from django.contrib.auth.models import User
# Create your models here.
class Categoria(models.Model):
    nombre = models.CharField(max_length=30)
    descripcion = models.TextField(null=True)

    def __str__(self):
        return self.nombre
    
class Producto(models.Model):
    nombre = models.CharField(max_length=30)
    descripcion = models.TextField(null=True)
    precio = models.DecimalField(decimal_places=2,max_digits=2)
    stock = models.IntegerField(default=0)
    imagenes = models.CharField(max_length=300)
    categoria = models.ForeignKey(Categoria,related_name="Productos",on_delete=models.RESTRICT)

class Carrito(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)  # Indica si el carrito está activo

    def __str__(self):
        return f"Carrito de {self.usuario.username}"

    def total(self):
        return sum(item.subtotal() for item in self.items.all())

class CarritoItem(models.Model):
    carrito = models.ForeignKey(Carrito, related_name='items', on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.cantidad} x {self.producto.nombre}"

    def subtotal(self):
        return self.cantidad * self.producto.precio



