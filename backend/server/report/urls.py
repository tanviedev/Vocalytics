from django.urls import path
from .views import student_report

urlpatterns = [
    path('report/', student_report),
]
