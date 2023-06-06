from django.shortcuts import render
from django.db import models
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Technician

# Create your models here.
class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = ["name", "vo_id"]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id"
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }


class BinListEncoder(ModelEncoder):
    model = BinVO
    properties = ["vo_id",
                  "name"]


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "POST":
        content = json.loads(request.body)
        try:
            # Get the BinVO vo_id and put it in the content dict
            bin_object = BinVO.objects.get(vo_id=content["bin"])
            content['bin'] = bin_object

        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid XXXXXXXX"},
                status=400,
            )

        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False,
        )

    else:
        if request.method == "GET":
            shoe = Technician.objects.all()
            return JsonResponse(
                {"technician": technician},
                encoder=TechnicianListEncoder,
            )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_technician(request, pk):
    if request.method == "GET":
        try:
            shoe = Shoe.objects.get(id=pk)
            return JsonResponse(
                shoe,
                encoder=ShoeListEncoder,
                safe=False
            )
        except Shoe.DoesNotExist:
            response = JsonResponse({"message": "Shoe does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            shoe = Shoe.objects.get(id=pk)
            shoe.delete()
            return JsonResponse(
                {"message": "The shoe was deleted"}
            )
        except Shoe.DoesNotExist:
            return JsonResponse({"message": "Shoe does not exist"})
    else:  # PUT

        try:
            content = json.loads(request.body)
            shoe = Shoe.objects.get(id=pk)

            # Get the BinVO vo_id and put it in the content dict
            bin_object = BinVO.objects.get(vo_id=content["bin"])
            content['bin'] = bin_object
            props = ["model", "manufacturer", "color", "picture_url", "bin"]
            for prop in props:
                if prop in content:
                    setattr(shoe, prop, content[prop])
            shoe.save()
            return JsonResponse(
                shoe,
                encoder=ShoeListEncoder,
                safe=False,
            )
        except Shoe.DoesNotExist:
            response = JsonResponse({"message": "Shoe not exist"})
            response.status_code = 404
            return response


# Create your views here.
