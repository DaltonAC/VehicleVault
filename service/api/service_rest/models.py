from django.db import models
from django.urls import reverse

# Create your models here.


class AutomobileVO(models.Model):
    auto_vo = models.CharField(max_length=200)
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})


class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        ordering = ["last_name", "last_name"]


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=200, default="Created")
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=200)
    vip = models.BooleanField(default=False)

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return f"{self.date_time} / {self.customer}"

    class Meta:
        ordering = ("date_time", "customer")
