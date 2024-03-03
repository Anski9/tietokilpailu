document.addEventListener("DOMContentLoaded", function () {
    fetch("questions.json")
        .then(Response => Response.json())
        .then(questions => {
            displayQuestions(questions);
            //Kuuntelija vastaa napille
            document.getElementById("submit-btn").addEventListener("click", function() {
                let score = 0;
                let answeredCount = 0;

                questions.forEach((question, index) => {
                    const selectedChoice = document.querySelector(`input[name="question${index}"]:checked`);
                    if (selectedChoice) {
                        answeredCount++;
                        if (selectedChoice.value === question.answer) {
                            score += question.points;
                        }
                    }
                });

                const resultDiv = document.getElementById("result");
                if (answeredCount === questions.length) {
                    resultDiv.innerHTML = `Sait ${score} oikein`;
                } else {
                    resultDiv.innerHTML = "Ole hyvä ja vastaa kaikkiin kysymyksiin";
                }
            });
        })
        .catch(error => {
            console.error("Virhe haettaessa kysymyksiä:", error);
        });
});

function displayQuestions(questions) {
    const quizContainer = document.getElementById("quiz-container");
    questions.forEach((question, index) => {
        const div = document.createElement("div");
        div.className = "mb-3";
        div.innerHTML = `
            <h4>Kysymys ${index + 1}: ${question.question}</h4>
            ${question.choices.map(choice =>
                `<div class="form-check">
                    <input class="form-check-input" type="radio" name="question${index}" id="${choice}" value="${choice}">
                    <label class="form-check-label" for="${choice}">
                        ${choice}
                    </label>
                </div>`
            ).join("")}
        `;
        quizContainer.appendChild(div);  
    });
}