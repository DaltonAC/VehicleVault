from django.db import models
from django.urls import reverse
# Create your models here.


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200)

    def __str__(self):
        return self.vin

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})


class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)

    def __str__(self):
        return self.employee_id

    def get_api_url(self):
        return reverse("salesperson_detail", kwargs={"pk": self.employee_id})


class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=13)

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"

    def get_api_url(self):
        return reverse("customer_detail", kwargs={"pk": self.phone_number})


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobile",
        on_delete=models.CASCADE,
    )

    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salesperson_name",
        on_delete=models.CASCADE
    )

    customer = models.ForeignKey(
        Customer,
        related_name="customer_name",
        on_delete=models.CASCADE,
    )

    price = models.DecimalField(max_digits=9, decimal_places=2)

    def __str__(self):
        return self.automobile

    def get_api_url(self):
        return reverse("sales_detail", kwargs={"pk": self.automobile})
