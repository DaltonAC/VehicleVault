from django.urls import path

from .views import (
    api_salespeople_list,
    api_salesperson,
    api_customer_list,
    api_customer,
    api_sales_list,
    api_sale,
    api_automobiles_list,
    api_sales_history
    )


urlpatterns = [
    path("salespeople/", api_salespeople_list, name="api_salespeople_list"),
    path("salespeople/<int:id>/", api_salesperson, name="api_salesperson"),
    path("customers/", api_customer_list, name="api_customer_list"),
    path("customers/<int:id>", api_customer, name="api_customer"),
    path("sales/", api_sales_list, name="api_sales_list"),
    path("sales/<int:id>", api_sale, name="api_sale"),
    path("autos/", api_automobiles_list, name="api_automobile_list"),
    path("saleshistory/", api_sales_history, name="api_sales_history")
]