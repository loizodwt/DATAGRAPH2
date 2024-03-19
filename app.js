"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const questionElement = document.getElementById("question");
  const vraiBtn = document.getElementById("vraiBtn");
  const fauxBtn = document.getElementById("fauxBtn");
  const feedbackElement = document.getElementById("feedback"); // test a ignorer
  const skipBtn = document.getElementById("skipBtn");

  let currentQuestionIndex = 0;
  let score = 0;
  let isQuestionDisplayed = false;

  let questionsData = null; // pour stocker les données hihi

  // peuti fetch qui va chercher les infos sur le doc questions.json
  fetch("/assets/data/questions.json")
    .then((response) => response.json())
    .then((data) => {
      questionsData = data;
      showQuestion();

      vraiBtn.addEventListener("click", () => checkAnswer(true, questionsData));
      fauxBtn.addEventListener("click", () =>
        checkAnswer(false, questionsData)
      );
      skipBtn.addEventListener("click", showSummary);
    });

  function showQuestion() {
    // Modification ici
    const currentQuestion = questionsData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    feedbackElement.textContent = ""; // réinitialisation de la réponse
    vraiBtn.style.display = "inline"; // affichage et désaffichaaage des boutons
    fauxBtn.style.display = "inline";
    isQuestionDisplayed = true;

    // Activer les boutons
    vraiBtn.disabled = false;
    fauxBtn.disabled = false;
  }

  function checkAnswer(userAnswer, questions) {
    const currentQuestion = questions[currentQuestionIndex];
    vraiBtn.disabled = true; // désactive les boutons pendant le delai chiant de la reponse
    fauxBtn.disabled = true;
    if (userAnswer === currentQuestion.reponse) {
      feedbackElement.textContent = "YE!";
      feedbackElement.style.color = "green";
      score++;
    } else {
      feedbackElement.textContent = `NAAAAAAN ${currentQuestion.anecdote}`;
      feedbackElement.style.color = "red";
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      setTimeout(() => {
        showQuestion(questions[currentQuestionIndex]);
        feedbackElement.textContent = "";
      }, 1000);
    } else {
      showSummary();
    }
  }

  function showSummary() {
    questionElement.textContent = `Quizz terminé score: ${score}/${currentQuestionIndex} :3`;
    vraiBtn.style.display = "none";
    fauxBtn.style.display = "none";
    skipBtn.style.display = "none";
    feedbackElement.textContent = "";
  }
});










// Données pour le graphique
const data = {
  labels: ['France', 'Italie', 'Allemagne', 'Suéde', 'Pays-Bas'],
  datasets: [{
    label: 'taux d absurdité',
    data: [3.4, 4.7, 2.9, 5, 1],
    backgroundColor: 'red'
    
  }]
};


// Options du graphique
const options = {
  animation: {
    duration: 1000, // Durée de l'animation en ms
    easing: 'easeInOutQuart' // Type d'animation
  },
  indexAxis: 'y', // Axes inversés pour obtenir un graphique vertical
  scales: {
    x: {
      beginAtZero: true,
      suggestedMax: 5 // Valeur maximale suggérée sur l'axe x
    }
  },
  plugins: {
    tooltip: {
      bodyFont: {
        family: 'Arial', // Police Arial
        size: 10 // Taille de police
      },
      titleFont: {
        family: 'Arial', // Police Arial
        size: 14 // Taille de police
      }
    }
  }
};

// Création du graphique
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: data,
  options: options
});