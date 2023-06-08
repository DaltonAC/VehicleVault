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
    elif request.method == "POST":
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
    else:
        return JsonResponse({"message": "Request method invalid"}, status=400)


@require_http_methods(["DELETE", "GET"])
def show_technician(request, id):
    if request.method == "GET":
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

    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(id=id)
            technician.delete()
            return JsonResponse({"message": "Technician was deleted"})
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technican cannot be found"})
            response.status_code = 404
            return response
    else:
        return JsonResponse({"message": "Request method invalid"}, status=400)


@require_http_methods(["DELETE"])
def delete_technician(request, id):
    if request.method == "DELETE":
        try:
            technician = Technician.objects.get(id=id)
            technician.delete()
            return JsonResponse(
                {"message": "Technician was deleted"}
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technican cannot be found"})
            response.status_code = 404
            return response
    else:
        return JsonResponse({"message": "Request method invalid"}, status=400)


# Appointments
@require_http_methods(["GET", "POST"])
def list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
                {"appointments": appointments},
                encoder=AppointmentEncoder,
            )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            technician_id = content["technician_id"]
            technician = Technician.objects.get(pk=technician_id)
            content["technician"] = technician
            sold_vin = content["vin"]
            if AutomobileVO.objects.filter(vin=sold_vin).exists():
                content["vip"] = True

            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Unable to create appointment"})
            response.status_code = 400
            return response
    else:
        return JsonResponse({"message": "Request method invalid"}, status=400)


@require_http_methods(["GET", "PUT"])
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

    elif request.method == "PUT":
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

    else:
        return JsonResponse({"message": "Request method invalid"}, status=400)


@require_http_methods(["PUT"])
def cancel_appointment(request, id):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.status = "canceled"
            appointment.save()
            return JsonResponse({"message": "Appointment marked as cancled"})

        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Appointment cannot be found"})
            response.status_code = 404
            return response

    return JsonResponse({"message": "Request method invalid"}, status=400)


@require_http_methods(["PUT"])
def finish_appointment(request, id):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.status = "finished"
            appointment.save()
            return JsonResponse({"message": "Appointment marked as finished"})

        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Appointment cannot be found"})
            response.status_code = 404
            return response

    return JsonResponse({"message": "Request method invalid"}, status=400)


@require_http_methods(["DELETE"])
def delete_appointment(request, id):
    if request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return JsonResponse(
                {"message": "Appointment was deleted"}
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Appointment cannot be found"})
            response.status_code = 404
            return response
