# council_complaints_app/models.py
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, User
from .choices import CASE_TYPE, STATUS 
# Example model for a Case

class Case(models.Model):
    name = models.CharField(db_index=True, max_length=255, unique=True ,null=True, blank=True)
    telephone = models.CharField(db_index=True, max_length=255, unique=True, null = True)
    email = models.EmailField(db_index=True, unique=True,  null=True, blank=True)
    case_short_description = models.CharField(max_length=150)
    comments = models.TextField(max_length=1000, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status =  models.CharField(max_length=500, choices=STATUS)
    case_type =  models.CharField(max_length=1000, choices=CASE_TYPE)
    staff_assigned= models.ForeignKey(User, on_delete=models.CASCADE, related_name='staff_cases_assigned',null=True)
    case_image = models.ImageField(upload_to= 'media/case_images/', blank = True, null=True)
    
    def __str__(self):
        return self.case_short_description
 