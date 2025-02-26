from django.test import TestCase
from django.contrib.auth.models import User
from  councilComplaintsBackend.models import Case
from councilComplaintsBackend.choices import CASE_TYPE, STATUS
from django.utils import timezone
import datetime


class CaseModelTest(TestCase):

    @classmethod
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.case = Case.objects.create(
            id=1111,
            name='Test Case',
            telephone='1234567890',
            email='test@example.com',
            case_short_description='Short description test case',
            comments='Test comments about the issue',
            status=STATUS[0][0],
            case_type=CASE_TYPE[0][0],
            staff_assigned=self.user,
            case_image ="testomagin_5Oc8vVy.png"
        )

    def test_nullable_fields(self):
        case = Case.objects.create(
            id=2,
            name='Test Case 2',
            case_short_description='Another short description',
            status=STATUS[0][0],
            case_type=CASE_TYPE[0][0]
        )
        self.assertIsNone(case.telephone)
        self.assertIsNone(case.email)
        self.assertIsNone(case.comments)
        self.assertIsNone(case.staff_assigned)

    
    def test_max_length(self):
        max_length_name = self.case._meta.get_field('name').max_length
        max_length_case_short_description = self.case._meta.get_field('case_short_description').max_length
        max_length_comments = self.case._meta.get_field('comments').max_length
        self.assertEqual(max_length_name, 255)
        self.assertEqual(max_length_case_short_description, 150)
        self.assertEqual(max_length_comments, 1000)
    

    def test_unique_fields(self):
        with self.assertRaises(Exception):
            Case.objects.create(
                id=1111,
                name='Duplicate Case',
                case_short_description='Duplicate short description',
                status=STATUS[0][0],
                case_type=CASE_TYPE[0][0]
            )

    
    def test_default_values(self):
        self.case = Case.objects.create(
            id=1,
            name='Test Case',
            telephone='1234567890',
            email='test@example.com',
            case_short_description='Short description of the case',
            comments='Some comments about the case',
            status=STATUS[0][0],
            case_type=CASE_TYPE[0][0],
            staff_assigned=self.user
        )
    
    def test_case_creation(self):
        case = Case.objects.create(
            id=2,
            name='Test Case 2',
            telephone='1234567890',
            email='test@example.com',
            case_short_description='Short description of the case',
            comments='Some comments about the case',
            status=STATUS[0][0],
            case_type=CASE_TYPE[0][0],
            staff_assigned=self.user
        )
        self.assertEqual(Case.objects.count(), 2)

    
    def test_case_update(self):
        self.case.name = 'Updated Test Case'
        self.case.save()
        self.assertEqual(self.case.name, 'Updated Test Case')
    
    def test_case_delete(self):
        self.case.delete()
        self.assertFalse(Case.objects.filter(id=1).exists())
