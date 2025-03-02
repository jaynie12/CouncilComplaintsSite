"""
URL configuration for councilComplaintsBackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django import views
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
router = DefaultRouter()
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [ 
    path('api/cases/', views.cases, name='cases'),
    path('api/case_details/<str:case_id>', views.case_details, name='case_details'),
    path('api/cases/username', views.case_by_user, name='case_by_user'),
    path('api/case-types/', views.get_case_types, name='case-types'),
    path('api/count-case-types/', views.count_case_types, name='case-type-count'),
    path('api/get-data-choices/', views.get_data_choices, name='get-data-choices'),
    path('api/count-case-status/', views.count_case_status, name='case-type-status'),
    path('api/choice/<str:filter>', views.count_dynamic, name='choice'),
    path('api/staff-login/', views.staff_login, name='staff-login'),    

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)