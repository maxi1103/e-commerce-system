from rest_framework import serializers
from .models import Banner, FeaturedProduct, SiteSetting
from api.serializers import ProductoSerializer
from api.models import Producto


class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = '__all__'


class FeaturedProductSerializer(serializers.ModelSerializer):
    product = ProductoSerializer(read_only=True)
    productId = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(), source='product', write_only=True
    )
    section_display = serializers.CharField(source='get_section_display', read_only=True)

    class Meta:
        model = FeaturedProduct
        fields = ['id', 'product', 'productId', 'section', 'section_display',
                  'order', 'isActive', 'createdAt']


class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = '__all__'

    def create(self, validated_data):
        obj, _ = SiteSetting.objects.get_or_create(pk=1, defaults=validated_data)
        if not _:
            for k, v in validated_data.items():
                setattr(obj, k, v)
            obj.save()
        return obj
