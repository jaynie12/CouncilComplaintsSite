from rest_framework import viewsets, status, authentication, permissions
from rest_framework.parsers import JSONParser
from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
import choices

from .models import *
from .serializers import *

#https://www.bezkoder.com/django-crud-mysql-rest-framework/

@api_view(['GET', 'POST'])
def cases_list(request):
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
        
        # Validate and save the data
        if case_serializer.is_valid():
            case_serializer.save()
            return Response(case_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(case_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

 
@api_view(['GET', 'PUT'])
def case_details(request, id):
    """GET / PUT cases by 'case id'

    Args:
        request (Request): The incoming API request object.
        id (string): case id of the case to be retrieved/updated

    Returns:
        Response: Objet with the JSON data with the case details or status code about the case updated
    """
    # find tutorial by pk (id)
    try: 
        case = Case.objects.get(pk=id) 
    except Case.DoesNotExist: 
        return JsonResponse({'message': 'The case does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        case_serializer = CaseSerializer(case) 
        return JsonResponse(case_serializer.data) 
    elif request.method == 'PUT': 
        case_data = JSONParser().parse(request) 
        case_serializer = CaseSerializer(case, data=case_data) 
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
    choice_dict = dict(choices.CASE_TYPES)
    for key, value in choice_dict.items():
        itered_dict = {"key": key, "value": value}
        my_choices.append(itered_dict)
    return Response(my_choices, status=status.HTTP_200_OK)