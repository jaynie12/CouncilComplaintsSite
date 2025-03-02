from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, authentication_classes
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from .choices import CASE_TYPE, STATUS,FILTER_CHOICES 
from django.contrib.auth.models import User
from .models import *
from .serializers import *
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Count
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets, filters
#inspiration: #https://www.bezkoder.com/django-crud-mysql-rest-framework/


@api_view(['GET', 'POST'])
def cases(request):
    """ GET list of cases, POST a new cases
    Args:
        request (Request): incoming request from the client side
    Returns:
        Response :  Objet with the JSON data with a list of cases or status code about the new case created
    """
    if request.method == 'GET':
        cases = Case.objects.all()
        cases_serializer = CaseSerializer(cases, many=True)
        return JsonResponse(cases_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        case_serializer = CaseCreateSerializer(data=request.data)
        parser_classes = (MultiPartParser, FormParser)
        print(case_serializer)
        # Validate and save the data
        if case_serializer.is_valid():
            case_serializer.save()
            return Response(case_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(case_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

 
@api_view(['GET', 'PUT'])
def case_details(request, case_id ):
    """GET / PUT cases by 'case id'

    Args:
        request (Request): The incoming API request object.
        id (string): case id of the case to be retrieved/updated

    Returns:
        Response: Objet with the JSON data with the case details or status code about the case updated
    """
    # find tutorial by pk (id)
    try: 
        case = Case.objects.get(pk=case_id) 
    except Case.DoesNotExist: 
        return JsonResponse({'message': 'The case does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        case_serializer = CaseSerializer(case) 
        return JsonResponse(case_serializer.data) 
    elif request.method == 'PUT': 
        case_data = JSONParser().parse(request) 
        case_serializer = CaseSerializer(case, data=case_data) 
        user_serializer = UserSerializer(case, data=case_data.get('staff_assigned'))
        if case_serializer.is_valid(): 
            case_serializer.save() 
            return JsonResponse(case_serializer.data) 
        return JsonResponse(case_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

        
@api_view(['GET'])
def case_by_user(request, username):
    """Get all cases by user who requested it

    Args:
        request (request):The incoming API request object.

    Returns:
        Response: Objet with the JSON data with a list of cases
    """
    cases = Case.objects.filter(username=username)
    if request.method == 'GET': 
        case_serializer = CaseSerializer(cases, many=True)
        return JsonResponse(case_serializer.data, safe=False)
    


@api_view(['GET'])
def get_case_types(request):
    """Get all case types

    Args:
        request (request):The incoming API request object.

    Returns:
        Response: Objet with the JSON data with a list of case types
    """
    my_choices = []
    choice_dict = dict(CASE_TYPE)
    for key, value in choice_dict.items():
        itered_dict = {"key": key, "value": value}
        my_choices.append(itered_dict)
    return Response(my_choices, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_data_choices(request):
    """Get all case types

    Args:
        request (request):The incoming API request object.

    Returns:
        Response: Objet with the JSON data with a list of case types
    """
    my_choices = []
    choice_dict = dict(FILTER_CHOICES)
    for key, value in choice_dict.items():
        itered_dict = {"key": key, "value": value}
        my_choices.append(itered_dict)
    return Response(my_choices, status=status.HTTP_200_OK)


@api_view(['GET'])
def count_case_types(request):
    """
    API endpoint to get the count of cases grouped by case type.
    """
    case_counts = Case.objects.values('case_type').annotate(total=Count('case_type'))
    
    return Response(case_counts)

@api_view(['GET'])
def count_case_status(request):
    """
    API endpoint to get the count of cases grouped by case status.
    """
    case_counts = Case.objects.values('status').annotate(total=Count('status'))
    
    return Response(case_counts)

@api_view(['GET'])
def count_dynamic(request,filter):
    """
    API endpoint to get the count of cases grouped by case type.
    """
    if filter == 'staff_assigned':
        case_counts = Case.objects.values('staff_assigned__username').annotate(total=Count('staff_assigned'))
    else:
        case_counts = Case.objects.values(filter).annotate(total=Count(filter))

    
    return Response(case_counts)


#https://docs.djangoproject.com/el/2.0//topics/auth/passwords/
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password  # Used to verify hashed passwords

@api_view(['POST'])
#https://docs.djangoproject.com/en/5.1/topics/auth/default/
def staff_login(request):
# Get username and password from the request body
    username = request.data.get('username')
    password = request.data.get('password')

    # Check if username and password are provided
    if not username or not password:
        return Response({"detail": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Query the User model to check if the username exists
        user = User.objects.get(username=username)
        
        # Check if the provided password matches the stored (hashed) password
        if check_password(password, user.password):
            return Response({"detail": "Login successful."})
        else:
            return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
    
    except User.DoesNotExist:
        return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)