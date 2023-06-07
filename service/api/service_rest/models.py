from django.db import models
from django.urls import reverse

# Create your models here.


class AutomobileVO(models.Model):
    vo_id = models.PositiveIntegerField()
    vin = models.CharField(max_length=200)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.vin}"

    class Meta:
        verbose_name = "AutomobileVO"
        verbose_name_plural = "AutomobileVO"


class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)

    appointment = models.ForeignKey(
        AutomobileVO,
        related_name="technicians",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return f"{self.first_name} + {self.last_name}"

    def get_api_url(self):
        return reverse("api_show_technician", kwargs={"pk": self.pk})

    class Meta:
        ordering = ("last_name", "first_name", "employee_id")
        verbose_name = "Technician"
        verbose_name_plural = "Technicians"


class Appointment(models.Model):
    date_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=200)
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)

    technician = models.ForeignKey(
        Technician,
        related_name="technicians",
        on_delete=models.PROTECT,
    )
