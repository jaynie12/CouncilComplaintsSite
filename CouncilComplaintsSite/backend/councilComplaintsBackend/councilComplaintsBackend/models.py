# council_complaints_app/models.py
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, User
from .choices import CASE_TYPE, STATUS 
# Example model for a Case

class Case(models.Model):
    """
    Model representing a case in the council complaints system.
    Attributes:
        name (CharField): The name of the case. Indexed, and can be null or blank.
        telephone (CharField): The telephone number associated with the case. Indexed, unique, and can be null.
        email (EmailField): The email address associated with the case. Indexed, unique, and can be null or blank.
        case_short_description (CharField): A short description of the case with a maximum length of 150 characters.
        comments (TextField): Additional comments about the case with a maximum length of 1000 characters. Can be null.
        created_at (DateTimeField): The date and time when the case was created. Automatically set on creation.
        status (CharField): The current status of the case. Defaults to 'Not assigned'. Choices are defined in STATUS.
        case_type (CharField): The type of the case. Choices are defined in CASE_TYPE.
        staff_assigned (ForeignKey): The staff member assigned to the case. Can be null. Related to User model.
        case_image (ImageField): An optional image associated with the case. Uploaded to 'media/case_images/'.
    Methods:
        __str__: Returns the short description of the case.
    """
    id = models.IntegerField(primary_key=True, blank=False, null=False, unique=True)
    name = models.CharField(db_index=True, max_length=255, unique=False ,null=True, blank=True)
    telephone = models.CharField(db_index=True, max_length=255, unique=False, null = True)
    email = models.EmailField(db_index=True, unique=False,  null=True, blank=True)
    case_short_description = models.CharField(max_length=150)
    comments = models.TextField(max_length=1000, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status =  models.CharField(max_length=500, choices=STATUS, default='Not assigned')
    case_type =  models.CharField(max_length=1000, choices=CASE_TYPE)
    staff_assigned= models.ForeignKey(User, on_delete=models.CASCADE, related_name='staff_cases_assigned',null=True)
    case_image = models.ImageField(upload_to= 'media/case_images/', blank = True, null=True)
    
    def __str__(self):
        return self.case_short_description
 