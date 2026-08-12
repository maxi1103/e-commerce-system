from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .models import Imagen,Producto,SubCategoria,Categoria,Medida,ClienteProfile

User = get_user_model()

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(ClienteProfile)
admin.site.register(Producto)
admin.site.register(SubCategoria)
admin.site.register(Categoria)
admin.site.register(Medida)
admin.site.register(Imagen)
