#Here is the serializer for model React. Serializers are basically used to convert complex data to native Python datatypes that can then be easily rendered into JSON

from rest_framework import serializers
from .models import Case
from django.contrib.auth.models import User


class CaseSerializer(serializers.ModelSerializer):
    staff_assigned = serializers.StringRelatedField()
    class Meta:
        model = Case
        fields = ['id', 'case_type', 'status', 'issue_description','impact_description' , 'proposed_action', 'name', 'staff_assigned','comments']

class CaseCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating a Case instance.
    Fields:
        name (str): The name of the person creating the case.
        email (str): The email address of the person creating the case.
        telephone (str): The telephone number of the person creating the case.
        case_type (str): The type/category of the case.
        case_short_description (str): A short description of the case.
        case_image (ImageField, optional): An optional image related to the case.
    Meta:
        model (Case): The model that this serializer is based on.
        fields (list): The list of fields to be included in the serialized output.
    """
    case_image = serializers.ImageField(required=False) 

    class Meta:
        model = Case
        fields = ['id','name' ,'email', 'telephone', 'case_type', 'issue_description', 'impact_description','proposed_action' ,'case_image']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']