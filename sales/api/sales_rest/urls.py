from django.urls import path
from .views import (
    list_salespeople,
    salesperson_detail,
    list_customers,
    customer_detail,
    list_sales,
    sales_detail,
)

urlpatterns = [
    path("salespeople/", list_salespeople, name="list_salespeople"),
    path("salespeople/<int:pk/", salesperson_detail, name="salesperson_detail"),
    path("customers/", list_customers, name="list_customers"),
    path("customers/<int:pk/", customer_detail, name="customer_detail"),
    path("sales/", list_sales, name="list_sales"),
    path("sales/<int:pk/", sales_detail, name="sales_detail"),
]