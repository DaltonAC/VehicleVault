from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, Salesperson, Customer, Sale
from django.db.models import Count


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id",
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "automobile",
        "customer",
        "salesperson",
        "id"
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "customer": CustomerEncoder(),
        "salesperson": SalespersonEncoder(),
    }


@require_http_methods(["GET"])
def api_automobiles_list(request):
    automobiles = AutomobileVO.objects.filter(sold=False)
    return JsonResponse(
        {"unsold_autos": automobiles},
        encoder=AutomobileVOEncoder,
        safe=False
    )


@require_http_methods(["GET", "POST"])
def api_salespeople_list(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Unable to create a salesperson"}
            )
            response.status_code = 400
            return response



@require_http_methods(["GET", "DELETE"])
def api_salesperson(request, pk):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=pk)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
        )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        try:
            salesperson = Salesperson.objects.get(id=pk)
            salesperson.delete()
            return JsonResponse(
                {"message": "deleted"}
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Sales person does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_customer_list(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create customer"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE"])
def api_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                {"message": "deleted"}
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_sales_list(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            salesperson = Salesperson.objects.get(id=content["salesperson"])
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": 'Invalid employee details'},
                status=400,
            )
        try:
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer details"},
                status=400
            )
        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            if automobile.sold == True:
                return JsonResponse(
                    {"message": "This vehicle is unavaiable"}
                )
            else:
                automobile.sold = True
                automobile.save()
                content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid VIN"},
                status=400,
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def api_sale(request, pk):
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
        try:
            sale = Sale.objects.get(id=pk)
            automobile = AutomobileVO.objects.get(vin=sale.automobile.vin)
            automobile.sold = False
            automobile.save()
            sale.delete()
            return JsonResponse(
                {"message": "deleted"}
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Invalid sale details"})
            response.status_code = 404
            return response


@require_http_methods("GET")
def api_sales_history(request):
    filtered_content = {}
    listofemployees = Salesperson.objects.filter(sale__isnull=False).values('id', 'employee_id', 'first_name', 'last_name').annotate(sale_count=Count('sale'))
    lists = list(listofemployees)
    try:
        return JsonResponse(
            lists,
            safe=False
        )
    except Salesperson.DoesNotExist:
        return JsonResponse(
            {"message": 'Invalid employee id'},
            status=400,
        )
