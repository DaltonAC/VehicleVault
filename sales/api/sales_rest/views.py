from django.shortcuts import render
from django.db import models
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from sales_rest.models import AutomobileVO, Salesperson, Customer, Sale
import json

# Create your views here.


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["id", "vin"]


class SalesPersonEncoder(ModelEncoder):
    model = Salesperson
    properties = ["id", "first_name", "last_name", "employee_id"]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["id", "first_name", "last_name", "address", "phone_number"]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = ["id", "automobile", "salesperson", "customer", "price"]


@require_http_methods(["GET", "POST"])
def list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalesPersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            salespeople = Salesperson.objects.create(**content)
            return JsonResponse(
                salespeople,
                encoder=SalesPersonEncoder,
                safe=False,
            )

        except:
            response = JsonResponse(
                {"message": "could not create the salesperson"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET"])
def salesperson_detail(request, pk):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=pk)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        request.method == "DELETE"
        try:
            salesperson = Salesperson.objects.get(id=pk)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET", "POST"])
def list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()

        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder
        )

    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.creatre(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Unable to create new customer"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET"])
def customer_detail(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        request.method == "DELETE"
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET", "POST"])
def list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
        )

    else:
        try:
            content = json.loads(request.body)
            sales = Sale.objects.create(**content)
            return JsonResponse(
                sales,
                encoder=SaleEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "could not create the sale"}
            )
            response.status_code = 400
            return response

@require_http_methods("DELETE", "GET")
def sales_detail(request, pk):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=pk)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        request.method == "DELETE"
        try:
            sale = Sale.objects.get(id=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
