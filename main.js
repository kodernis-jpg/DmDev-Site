    document.getElementById("submit-btn").addEventListener("click", () => {
    let score = 0;
    let total = 10;

    // правильні відповіді
    const answers = {
        q1: "Matematika",
        q2: "Číslo",
        q3: "Číslica",
        q4: "Rovnica",
        q5: "Výraz",
        q6: "Príklad",
        q7: "Úloha",
        q8: "Sčítanie",
        q9: "Odčítanie",
        q10: "Násobenie"
    };

    for (let key of ["q1","q2","q5","q6","q9","q10"]) {
        let selected = document.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === answers[key]) score++;
    }

    for (let key of ["q3","q4","q7","q8"]) {
        let input = document.querySelector(`input[name="${key}"]`);
        if (input && input.value.trim().toLowerCase() === answers[key].toLowerCase()) score++;
    }

    document.getElementById("result").innerText =
        `Ти відповів правильно на ${score} з ${total} завдань.`;
    });
