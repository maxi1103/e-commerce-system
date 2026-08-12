from django.db import models
#from api_auth.models import Cliente
from django.contrib.auth.models import AbstractUser
# Create your models here.

#Usuarios
class User(AbstractUser):
    email = models.EmailField(unique=True)

class ClienteProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="client_profile")
    dni = models.CharField(max_length=20, unique=True)
    nombre= models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    direccion = models.CharField(max_length=255, null=True, blank=True)
    telefono = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return self.user.username
 #------   

class Categoria(models.Model):
    nombre = models.CharField(max_length=30)
    descripcion = models.TextField(null=True)

    def __str__(self):
        return self.nombre

class SubCategoria(models.Model):
    nombre= models.CharField(max_length=30)
    descripcion = models.TextField(null=True)
    categoria_id=models.ForeignKey(Categoria,related_name="SubCategorias",on_delete=models.RESTRICT,null=True)

    def __str__(self):
        return self.nombre

class Medida(models.Model):
    nombre = models.CharField(max_length=30)
    descripcion = models.TextField(null=True)

    def __str__(self):
        return self.nombre
    
class Producto(models.Model):
    nombre = models.CharField(max_length=30)
    descripcion = models.TextField(null=True)
    subCategoria = models.ForeignKey(SubCategoria,related_name="Productos",on_delete=models.RESTRICT,null=True)
    
    def __str__(self):
        return self.nombre

class ProductoVariante(models.Model):
    producto_id=models.ForeignKey(Producto,related_name="Variantes",on_delete=models.RESTRICT,null=True)
    medida_id=models.ForeignKey(Medida,related_name="Variantes",on_delete=models.RESTRICT,null=True)
    color=models.CharField(max_length=30)
    sku=models.CharField(max_length=30,unique=True)
    precio=models.DecimalField(decimal_places=2,max_digits=10)
    stock=models.IntegerField(default=0)

    def __str__(self):
        return self.sku

class Imagen(models.Model):
    productovariante_id=models.ForeignKey(ProductoVariante,related_name="Imagenes",on_delete=models.RESTRICT,null=True)
    imagen = models.CharField(max_length=300)

    def __str__(self):
        return f"Imagen de {self.productovariante_id.sku}"

class Carrito(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Carrito de {self.usuario.username}"


class CarritoItem(models.Model):
    producto_id= models.ForeignKey(Producto,related_name="CarritoItems",on_delete=models.RESTRICT,null=True)
    carrito_id = models.ForeignKey(Carrito,related_name="CarritoItems",on_delete=models.RESTRICT,null=True)
    cantidad = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.cantidad} x {self.producto_id.nombre} in {self.carrito_id.usuario.username}'s cart"

class Orden(models.Model):
    usuario_id = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha_pedido= models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(decimal_places=2,max_digits=10)
    status = models.CharField(max_length=20, default='Pendiente')

    def __str__(self):
        return f"Orden {self.id} de {self.usuario_id.username} - Status: {self.status}"

class OrdenItem(models.Model):
    orden_id = models.ForeignKey(Orden, related_name="OrdenItems", on_delete=models.CASCADE)
    producto_id = models.ForeignKey(Producto, related_name="OrdenItems", on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.cantidad} x {self.producto_id.nombre} in order {self.orden_id.id}"

class Pago(models.Model):
    orden_id = models.ForeignKey(Orden, related_name="Pagos", on_delete=models.CASCADE)
    metodo_pago = models.CharField(max_length=50)
    fecha_pago = models.DateTimeField(auto_now_add=True)
    monto = models.DecimalField(decimal_places=2,max_digits=10)
    transaccion_id = models.CharField(max_length=100, unique=True)

