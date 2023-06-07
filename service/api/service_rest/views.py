from django.shortcuts import render
from django.db import models
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Technician, AutomobileVO, Appointment

# Create your models here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
        "id",
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "vip",
        "id",
        "technician"
    ]

    encoders = {
        "technician": TechnicianEncoder(),
    }


# Technicians
@require_http_methods(["GET", "POST"])
def list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
                {"technicians": technicians},
                encoder=TechnicianEncoder,
                safe=False
            )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )

        except:
            response = JsonResponse({"message": "Unable to create technician"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET"])
def show_technician(request, pk):
    if request.method == "GET":  # get
        try:
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technician cannot be found"})
            response.status_code = 404
            return response

    elif request.method == "DELETE":  # delete
        try:
            technician = Technician.objects.get(id=pk)
            technician.delete()
            return JsonResponse({"message": "Technician deleted"})
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technican cannot be found"})
            response.status_code = 400
            return response


# Appointments
@require_http_methods(["GET", "POST"])
def list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
                {"appointments": appointments},
                encoder=AppointmentEncoder,
            )
    else:
        try:
            content = json.loads(request.body)
            technician_id = content["technician_id"]
            technician = Technician.objects.get(pk=technician_id)
            content["technician"] = technician
            sold_vin = content["vin"]
            if AutomobileVO.objects.filter(vin=sold_vin, sold=True).exists():
                content["vip"] = True

            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )

        except:
            response = JsonResponse({"message": "Unable to create appointment"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def show_appointment(request, id):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Appointment cannot be found"})
            response.status_code = 404
            return response

    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return JsonResponse({"message": "Appointment deleted"})
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Appointment cannot be found"})
            response.status_code = 404
            return response
    else:
        try:
            content = json.loads(request.body)
            appointment = Appointment.objects.get(id=id)
            props = ["status"]
            for prop in props:
                if prop in content:
                    setattr(appointment, prop, content[prop])
            appointment.save()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Appointment cannot be found"})
            response.status_code = 404
            return response
