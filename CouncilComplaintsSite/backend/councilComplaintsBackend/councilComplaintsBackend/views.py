from rest_framework import viewsets

from .models import *
from .serializers import *


class CaseViewSet(viewsets.ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    user_class = UserSerializer