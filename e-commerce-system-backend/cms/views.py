from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Banner, FeaturedProduct, SiteSetting
from .serializers import BannerSerializer, FeaturedProductSerializer, SiteSettingSerializer


class BannerViewSet(viewsets.ModelViewSet):
    serializer_class = BannerSerializer
    queryset = Banner.objects.all()

    def get_queryset(self):
        qs = Banner.objects.all()
        active_only = self.request.query_params.get('active')
        if active_only == 'true':
            qs = qs.filter(isActive=True)
        return qs


class FeaturedProductViewSet(viewsets.ModelViewSet):
    serializer_class = FeaturedProductSerializer
    queryset = FeaturedProduct.objects.all()

    def get_queryset(self):
        qs = FeaturedProduct.objects.select_related('product').all()
        section = self.request.query_params.get('section')
        if section:
            qs = qs.filter(section=section)
        active_only = self.request.query_params.get('active')
        if active_only == 'true':
            qs = qs.filter(isActive=True)
        return qs


class SiteSettingViewSet(viewsets.ModelViewSet):
    serializer_class = SiteSettingSerializer
    queryset = SiteSetting.objects.all()

    def list(self, request, *args, **kwargs):
        obj, _ = SiteSetting.objects.get_or_create(pk=1)
        serializer = self.get_serializer(obj)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        obj, _ = SiteSetting.objects.get_or_create(pk=1)
        serializer = self.get_serializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
