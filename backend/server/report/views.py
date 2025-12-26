from django.shortcuts import render
from django.http import JsonResponse


def student_report(request):
    data = {
        "student": {
            "name": "Tanvi Takle",
            "candidate_id": "STU2025",
            "test_date": "2025-01-10",
            "test_type": "Speaking Assessment"
        },
        "scores": {
            "overall": 7.0,
            "pronunciation": 7.5,
            "fluency": 7.0,
            "vocabulary": 6.5,
            "grammar": 7.0
        }
    }
    return JsonResponse(data)

def report_page(request):
    return render(request, "index.html")