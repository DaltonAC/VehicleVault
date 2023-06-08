from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})


class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)

    def get_api_url(self):
        return reverse("salesperson_detail", kwargs={"pk": self.id})


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.PositiveBigIntegerField()


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sale",
        on_delete=models.PROTECT,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sale",
        on_delete=models.PROTECT
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sale",
        on_delete=models.PROTECT
    )
    price = models.PositiveBigIntegerField()

    def get_api_url(self):
        return reverse("sales_detail", kwargs={"pk": self.id})
