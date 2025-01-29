# council_complaints_app/models.py
from django.db import models
from django.contrib.auth.models import User

# Example model for a Case
class Case(models.Model):
    CASE_TYPES = [
     ("Potholes", "Potholes"),
     ("Street lighting", "Street lighting"),
     ("Graffiti", "Graffiti"),
     ("Anti-Social behavior", "Anti-Social behavior"),
     ('Other', 'Other')
  ]
    STATUS_TYPES = [
        ("Not Assigned", "Not Assigned"),
        ("In progress", "In progress"),
        ("Complete", "Complete"),
        ("Cancelled", "Cancelled"),
    ]
    case_short_description = models.CharField(max_length=150)
    case_long_description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status =  models.CharField(max_length=500, choices=STATUS_TYPES)
    case_type =  models.CharField(max_length=1000, choices=CASE_TYPES)
    user_raised= models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_cases_raised')
    staff_assigned= models.ForeignKey(User, on_delete=models.CASCADE, related_name='staff_cases_assigned')
    case_image = models.ImageField()

    
    def __str__(self):
        return self.case_short_description