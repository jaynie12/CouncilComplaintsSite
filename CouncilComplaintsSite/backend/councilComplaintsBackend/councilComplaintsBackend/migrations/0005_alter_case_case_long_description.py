# Generated by Django 5.1.5 on 2025-02-01 13:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('councilComplaintsBackend', '0004_case_case_long_description_alter_case_case_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='case',
            name='case_long_description',
            field=models.TextField(max_length=1000, null=True),
        ),
    ]
