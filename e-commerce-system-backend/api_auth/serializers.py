from rest_framework import serializers
from django.contrib.auth import get_user_model
from api.models import ClienteProfile

User = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    dni = serializers.CharField(max_length=20, required=False, write_only=True)
    nombre = serializers.CharField(max_length=50, required=False, write_only=True)
    apellido = serializers.CharField(max_length=50, required=False, write_only=True)
    direccion = serializers.CharField(max_length=255, required=False, write_only=True)
    telefono = serializers.CharField(max_length=20, required=False, write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'dni', 'nombre', 'apellido', 'direccion', 'telefono']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        dni = validated_data.pop('dni', None)
        nombre = validated_data.pop('nombre', '')
        apellido = validated_data.pop('apellido', '')
        direccion = validated_data.pop('direccion', '')
        telefono = validated_data.pop('telefono', '')

        user = User.objects.create_user(**validated_data)

        ClienteProfile.objects.create(
            user=user,
            dni=dni or f'default-{user.id}',
            nombre=nombre,
            apellido=apellido,
            direccion=direccion,
            telefono=telefono,
        )
        return user


class ClienteListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class ClienteProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClienteProfile
        fields = ['dni', 'nombre', 'apellido', 'direccion', 'telefono']


class ClienteMeSerializer(serializers.ModelSerializer):
    profile = ClienteProfileSerializer(source='client_profile', read_only=False, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)

        instance.email = validated_data.get('email', instance.email)
        instance.save()

        if profile_data:
            profile = instance.client_profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()

        return instance


class ClienteDetailSerializer(serializers.ModelSerializer):
    profile = ClienteProfileSerializer(source='client_profile', read_only=False, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'profile']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)

        instance.email = validated_data.get('email', instance.email)
        instance.is_staff = validated_data.get('is_staff', instance.is_staff)
        instance.save()

        if profile_data:
            profile = instance.client_profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()

        return instance
