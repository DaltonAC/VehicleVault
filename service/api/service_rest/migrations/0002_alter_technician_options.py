# Generated by Django 4.0.3 on 2023-06-06 18:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='technician',
            options={'ordering': ['last_name']},
        ),
    ]
