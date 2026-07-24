import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0004_remove_producto_medida_producto_medidas'),
    ]

    operations = [
        migrations.CreateModel(
            name='Banner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('subtitle', models.CharField(blank=True, default='', max_length=500)),
                ('image', models.CharField(blank=True, default='', max_length=500)),
                ('buttonText', models.CharField(blank=True, default='Compra Ahora', max_length=100)),
                ('buttonLink', models.CharField(blank=True, default='/collection', max_length=500)),
                ('isActive', models.BooleanField(default=True)),
                ('order', models.IntegerField(default=0)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='SiteSetting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('siteName', models.CharField(default='Mi Tienda', max_length=200)),
                ('logo', models.CharField(blank=True, default='', max_length=500)),
                ('footerText', models.TextField(blank=True, default='Tu tienda de confianza')),
                ('contactEmail', models.CharField(blank=True, default='', max_length=200)),
                ('contactPhone', models.CharField(blank=True, default='', max_length=50)),
                ('facebook', models.CharField(blank=True, default='', max_length=500)),
                ('instagram', models.CharField(blank=True, default='', max_length=500)),
                ('twitter', models.CharField(blank=True, default='', max_length=500)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Site Setting',
                'verbose_name_plural': 'Site Settings',
            },
        ),
        migrations.CreateModel(
            name='FeaturedProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('section', models.CharField(choices=[('latest_collection', 'Ultimos Ingresos'), ('best_seller', 'Mas Vendidos')], default='latest_collection', max_length=50)),
                ('order', models.IntegerField(default=0)),
                ('isActive', models.BooleanField(default=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='featured_entries', to='api.producto')),
            ],
            options={
                'ordering': ['order'],
                'unique_together': {('product', 'section')},
            },
        ),
    ]
