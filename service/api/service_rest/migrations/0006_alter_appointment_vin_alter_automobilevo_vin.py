# Generated by Django 4.0.3 on 2023-06-07 21:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0005_alter_appointment_status_alter_appointment_vin_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='vin',
            field=models.CharField(max_length=17),
        ),
        migrations.AlterField(
            model_name='automobilevo',
            name='vin',
            field=models.CharField(max_length=17),
        ),
    ]