#Here is the serializer for model React. Serializers are basically used to convert complex data to native Python datatypes that can then be easily rendered into JSON

from rest_framework import serializers
from .models import Case
from django.contrib.auth.models import User


class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = ['case_type', 'status', 'case_short_description','created_at', 'user_raised', 'staff_assigned', 'case_image']

class CaseCreateSerializer(serializers.ModelSerializer):
    case_image = serializers.ImageField(required=False) 

    class Meta:
        model = Case
        fields = ['name' ,'email', 'telephone', 'case_type', 'case_short_description', 'case_image']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active', 'created', 'updated']
        read_only_field = ['is_active', 'created', 'updated']