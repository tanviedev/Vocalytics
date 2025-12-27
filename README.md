🎤 Vocalytics – Student Speaking Assessment Report

Vocalytics is a Student Speaking Assessment Report Page inspired by platforms like SpeechAce / IELTS score reports.
It displays a student’s speaking performance using clear UI, visual charts, and dynamic feedback logic.

This project is built as a functional prototype for a Full Stack Development Assessment.

🔗 Live Demo

Frontend (Vercel):
👉 https://vocalytics-2j97.vercel.app/

📌 Features
✅ Summary of Scores

Overall Speaking Score (out of 9)

CEFR Level mapping (A2 → C2)

Skill-wise scores:

Pronunciation

Fluency

Vocabulary

Grammar

📊 Visual Representation

Progress bars for individual skills

Interactive skill comparison chart (Chart.js)

🧠 Intelligent Feedback Logic

Dynamic descriptive feedback based on score ranges

Skill-wise strengths and improvement areas

Personalized improvement recommendations

Target band vs current band comparison

🖨️ User Experience

Clean, responsive UI using Bootstrap 5

Print-friendly report layout

Consistent color palette–based design

🛠 Tech Stack
Frontend

HTML5

CSS3

Bootstrap 5

JavaScript (ES6)

Chart.js

Backend (Data Source Only)

Django

JSON-based API endpoint

No database used

📂 Project Structure
Vocalytics/
│
├── backend/
│   ├── server/
│   │   ├── report/
│   │   │   ├── views.py
│   │   │   └── urls.py
│   │   └── settings.py
│   └── manage.py
│
├── frontend/
│   ├── index.html
│   ├── vercel.json
│   └── static/
│       ├── css/style.css
│       └── js/main.js
│
└── README.md

▶️ How to Run the Project Locally
1️⃣ Backend (Django – Data API)
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install django
python manage.py runserver


API endpoint:

http://127.0.0.1:8000/api/report/

2️⃣ Frontend

Open directly in browser:

frontend/index.html


OR view the hosted version via the provided frontend link.

📡 Where the Scores Are Stored

The scores are stored as a static JSON object inside the Django view and returned through a single API endpoint.

Example response:

{
  "student": {
    "name": "Tanvi Takle",
    "candidate_id": "VOC12345",
    "test_date": "2025-12-25",
    "test_type": "Speaking Assessment"
  },
  "scores": {
    "overall": 7,
    "pronunciation": 7,
    "fluency": 6,
    "vocabulary": 7,
    "grammar": 6
  }
}

🧮 Feedback Logic
Overall Feedback
Score Range	Description
≥ 8	Excellent performance with strong control
6–7	Good performance with minor inaccuracies
< 6	Needs improvement
Skill-wise Feedback

Each skill displays feedback based on score:

Excellent

Good

Needs Improvement

Recommendations

Personalized recommendations are generated automatically for skills scoring below 7.

🚫 What Is NOT Included

Database setup

Login or authentication

Admin panel

AI / ML evaluation

Production backend deployment

📈 Evaluation Alignment

This project demonstrates:

Clear and intuitive UI design

Accurate display of scores and charts

Logical, dynamic feedback generation

Clean and readable code structure

Proper documentation

👩‍💻 Author

Tanvi Takle
Full Stack Development Assignment
December 2025
