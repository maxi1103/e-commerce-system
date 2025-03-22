from django.contrib import admin
from .models import Producto,SubCategoria,Categoria,Medida

# Register your models here.
admin.site.register(Producto)
admin.site.register(SubCategoria)
admin.site.register(Categoria)
admin.site.register(Medida)