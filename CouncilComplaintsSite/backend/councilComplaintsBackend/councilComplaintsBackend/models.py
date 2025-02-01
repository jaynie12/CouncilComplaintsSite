# council_complaints_app/models.py
from django.db import models
from django.contrib.auth.models import User
import choices

# Example model for a Case
class Case(models.Model):

    case_short_description = models.CharField(max_length=150)
    comments = models.TextField(max_length=1000, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status =  models.CharField(max_length=500, choices=choices.STATUS)
    case_type =  models.CharField(max_length=1000, choices=choices.CASE_TYPES)
    user_raised= models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_cases_raised0', null=True)
    staff_assigned= models.ForeignKey(User, on_delete=models.CASCADE, related_name='staff_cases_assigned',null=True)
    case_image = models.ImageField(null=True)


    
    def __str__(self):
        return self.case_short_description