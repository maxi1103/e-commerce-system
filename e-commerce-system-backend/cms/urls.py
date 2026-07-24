from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'banners', views.BannerViewSet, basename='banner')
router.register(r'featured-products', views.FeaturedProductViewSet, basename='featured-product')
router.register(r'site-settings', views.SiteSettingViewSet, basename='site-setting')

urlpatterns = [
    path('', include(router.urls)),
]
