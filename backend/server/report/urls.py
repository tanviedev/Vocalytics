from django.urls import path
from .views import student_report, report_page

urlpatterns = [
    path('report/', student_report),
    path('', report_page),
]
