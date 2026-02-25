let healthData = JSON.parse(localStorage.getItem("healthData")) || [];
let myChart;

function calculateScore(water, sleep, exercise) {
    let score = 0;

    // Water
    if (water >= 2) score += 30;
    else if (water >= 1) score += 20;
    else score += 10;

    // Sleep
    if (sleep >= 7) score += 30;
    else if (sleep >= 6) score += 20;
    else score += 10;

    // Exercise
    if (exercise >= 30) score += 40;
    else if (exercise > 0) score += 25;
    else score += 10;

    return score;
}

function generateSuggestion(water, sleep, exercise) {
    if (sleep < 6 && exercise === 0 && water < 1.5) {
        return "High fatigue risk. Drink 2L water & do 20 min walk tomorrow.";
    }
    if (sleep < 6) {
        return "Try sleeping at least 7 hours.";
    }
    if (exercise < 20) {
        return "Add at least 20 minutes of exercise.";
    }
    return "Great job! Maintain your healthy routine.";
}

function saveData() {
    let water = parseFloat(document.getElementById("water").value);
    let sleep = parseFloat(document.getElementById("sleep").value);
    let exercise = parseFloat(document.getElementById("exercise").value);

    if (isNaN(water) || isNaN(sleep) || isNaN(exercise)) {
        alert("Please enter all fields properly!");
        return;
    }

    let score = calculateScore(water, sleep, exercise);
    let suggestion = generateSuggestion(water, sleep, exercise);

    let scoreElement = document.getElementById("score");
    scoreElement.innerText = score;

    // Score Color
    if (score >= 80) {
        scoreElement.style.color = "green";
    } else if (score >= 50) {
        scoreElement.style.color = "orange";
    } else {
        scoreElement.style.color = "red";
    }

    document.getElementById("suggestion").innerText = suggestion;

    healthData.push({ water, sleep, exercise, score });
    localStorage.setItem("healthData", JSON.stringify(healthData));

    updateChart();

    // Clear Inputs
    document.getElementById("water").value = "";
    document.getElementById("sleep").value = "";
    document.getElementById("exercise").value = "";
}

function updateChart() {
    let ctx = document.getElementById("healthChart").getContext("2d");

    let labels = healthData.map((_, index) => "Day " + (index + 1));
    let scores = healthData.map(data => data.score);

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Health Score",
                data: scores,
                borderWidth: 2
            }]
        }
    });
}

updateChart();