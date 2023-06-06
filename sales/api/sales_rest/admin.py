from django.contrib import admin
from .models import Salesperson, Customer, Sale


admin.site.register(Salesperson)
admin.site.register(Customer)
admin.site.register(Sale)