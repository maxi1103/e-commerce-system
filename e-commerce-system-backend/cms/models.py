from django.db import models


class Banner(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=500, blank=True, default='')
    image = models.CharField(max_length=500, blank=True, default='')
    buttonText = models.CharField(max_length=100, blank=True, default='Compra Ahora')
    buttonLink = models.CharField(max_length=500, blank=True, default='/collection')
    isActive = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class FeaturedProduct(models.Model):
    SECTION_CHOICES = [
        ('latest_collection', 'Ultimos Ingresos'),
        ('best_seller', 'Mas Vendidos'),
    ]

    product = models.ForeignKey('api.Producto', on_delete=models.CASCADE, related_name='featured_entries')
    section = models.CharField(max_length=50, choices=SECTION_CHOICES, default='latest_collection')
    order = models.IntegerField(default=0)
    isActive = models.BooleanField(default=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']
        unique_together = ['product', 'section']

    def __str__(self):
        return f"{self.product.nombre} - {self.get_section_display()}"


class SiteSetting(models.Model):
    siteName = models.CharField(max_length=200, default='Mi Tienda')
    logo = models.CharField(max_length=500, blank=True, default='')
    footerText = models.TextField(blank=True, default='Tu tienda de confianza')
    contactEmail = models.CharField(max_length=200, blank=True, default='')
    contactPhone = models.CharField(max_length=50, blank=True, default='')
    facebook = models.CharField(max_length=500, blank=True, default='')
    instagram = models.CharField(max_length=500, blank=True, default='')
    twitter = models.CharField(max_length=500, blank=True, default='')
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Site Setting'
        verbose_name_plural = 'Site Settings'

    def __str__(self):
        return self.siteName

    def save(self, *args, **kwargs):
        if not self.pk and SiteSetting.objects.exists():
            raise ValueError('Only one SiteSetting instance is allowed.')
        super().save(*args, **kwargs)
