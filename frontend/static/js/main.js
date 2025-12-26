const API_URL = "http://127.0.0.1:8000/api/report/";

document.addEventListener("DOMContentLoaded", () => {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            populateStudentInfo(data);
            populateOverallScore(data);
            populateSkillScores(data);
            renderRadarChart(data.scores);
            generateDescriptiveFeedback(data);
            generateRecommendations(data.scores);
            populateTargetBand(data.scores.overall);
        })
        .catch(error => console.error("Error fetching data:", error));
});

/* ---------------- STUDENT INFO ---------------- */

function populateStudentInfo(data) {
    document.getElementById("studentName").innerText = data.student.name;
    document.getElementById("candidateId").innerText = data.student.candidate_id;
    document.getElementById("testDate").innerText = data.student.test_date;
    document.getElementById("testType").innerText = data.student.test_type;
}

/* ---------------- OVERALL SCORE ---------------- */

function populateOverallScore(data) {
    const score = data.scores.overall;
    document.getElementById("overallScore").innerText = score;
    document.getElementById("cefrLevel").innerText = "CEFR Level: " + getCEFRLevel(score);
}

function getCEFRLevel(score) {
    if (score >= 8) return "C1 – C2 (Advanced)";
    if (score >= 6) return "B2 (Upper Intermediate)";
    if (score >= 4) return "B1 (Intermediate)";
    return "A2 (Basic)";
}

/* ---------------- SKILL SCORES ---------------- */

function populateSkillScores(data) {
    const skills = data.scores;
    const container = document.getElementById("skillsContainer");

    // 🔥 CRITICAL FIX
    container.innerHTML = "";

    const strengths = [];
    const improvements = [];

    const skillMap = {
        pronunciation: "Pronunciation",
        fluency: "Fluency",
        vocabulary: "Vocabulary",
        grammar: "Grammar"
    };

    Object.keys(skillMap).forEach(skill => {
        const score = skills[skill];
        const percentage = (score / 9) * 100;
        const level = getSkillLevel(score);

        if (score >= 7) strengths.push(skillMap[skill]);
        else improvements.push(skillMap[skill]);

        container.innerHTML += `
            <div class="mb-4">
                <div class="d-flex justify-content-between">
                    <strong>${skillMap[skill]}</strong>
                    <span>${score} / 9</span>
                </div>

                <div class="progress mt-1">
                    <div class="progress-bar bg-primary" style="width:${percentage}%"></div>
                </div>

                <span class="badge bg-secondary mt-1">${level}</span>
            </div>
        `;
    });

    populateStrengths(strengths);
    populateImprovements(improvements);
}

function getSkillLevel(score) {
    if (score >= 8) return "Excellent";
    if (score >= 6) return "Good";
    return "Needs Improvement";
}

/* ---------------- STRENGTHS & IMPROVEMENTS ---------------- */

function populateStrengths(strengths) {
    const list = document.getElementById("strengthsList");
    list.innerHTML = strengths.length
        ? strengths.map(s => `<li class="list-group-item">✔ ${s}</li>`).join("")
        : "<li class='list-group-item'>No strong areas identified</li>";
}

function populateImprovements(improvements) {
    const list = document.getElementById("improvementList");
    list.innerHTML = improvements.length
        ? improvements.map(s => `<li class="list-group-item">⚠ ${s}</li>`).join("")
        : "<li class='list-group-item'>No major improvement areas</li>";
}

/* ---------------- RADAR CHART ---------------- */

let radarChart;

function renderRadarChart(scores) {
    const ctx = document.getElementById('skillRadarChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Pronunciation', 'Fluency', 'Vocabulary', 'Grammar'],
            datasets: [{
                label: 'Score (out of 9)',
                data: [
                    scores.pronunciation,
                    scores.fluency,
                    scores.vocabulary,
                    scores.grammar
                ],
                borderRadius: 8
            }]
        },
        options: {
            indexAxis: 'y', // horizontal bars
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    min: 0,
                    max: 9,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}


/* ---------------- FEEDBACK ---------------- */

function generateDescriptiveFeedback(data) {
    const scores = data.scores;
    document.getElementById("overallFeedback").innerText =
        getOverallFeedback(scores);

    const container = document.getElementById("skillFeedback");
    container.innerHTML = "";

    Object.keys(scores).forEach(skill => {
        if (skill === "overall") return;
        container.innerHTML += `
            <p><strong>${capitalize(skill)}:</strong> ${getSkillFeedback(skill, scores[skill])}</p>
        `;
    });
}

function getSkillFeedback(skill, score) {
    if (score >= 8) return "Excellent control with strong accuracy.";
    if (score >= 6) return "Generally good performance with minor issues.";
    return "Needs focused improvement.";
}

function getOverallFeedback(scores) {
    if (scores.overall >= 8)
        return "Excellent speaking performance with strong control across skills.";
    if (scores.overall >= 6)
        return "Good speaking ability with scope for improvement.";
    return "Speaking skills need significant improvement.";
}

/* ---------------- RECOMMENDATIONS ---------------- */

function generateRecommendations(scores) {
    const tips = {
        pronunciation: "Practice stress and intonation patterns daily.",
        fluency: "Work on reducing pauses through timed speaking practice.",
        vocabulary: "Learn topic-based vocabulary and use it actively.",
        grammar: "Practice complex sentence structures regularly."
    };

    const list = document.getElementById("recommendationList");
    list.innerHTML = "";

    let added = false;
    Object.keys(tips).forEach(skill => {
        if (scores[skill] < 7) {
            list.innerHTML += `<li>${tips[skill]}</li>`;
            added = true;
        }
    });

    if (!added) {
        list.innerHTML = "<li>Excellent performance. Keep practicing consistently.</li>";
    }
}

/* ---------------- TARGET BAND ---------------- */

function populateTargetBand(currentScore) {
    const target = 7.5;
    document.getElementById("currentBand").innerText = currentScore;
    document.getElementById("bandGap").innerText =
        currentScore >= target ? "Target Achieved" : (target - currentScore).toFixed(1);
}

/* ---------------- UTIL ---------------- */

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
