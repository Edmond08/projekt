let grades = [];

function addGrade() {
    const role = document.getElementById("role").value;

    if (role !== "teacher") {
        alert("Csak tanár adhat hozzá jegyet!");
        return;
    }

    const student = document.getElementById("studentName").value;
    const subject = document.getElementById("subject").value;
    const grade = parseInt(document.getElementById("grade").value);

    if (!student || !subject || !grade) {
        alert("Minden mezőt ki kell tölteni!");
        return;
    }

    grades.push({ student, subject, grade });
    render();
}

function render() {
    const role = document.getElementById("role").value;
    const app = document.getElementById("app");

    let html = `<table>
        <tr>
            <th>Diák</th>
            <th>Tantárgy</th>
            <th>Jegy</th>
            ${role === "teacher" ? "<th></th>" : ""}
        </tr>`;

    grades.forEach((g, i) => {
        html += `<tr>
            <td>${g.student}</td>
            <td>${g.subject}</td>
            <td>${g.grade}</td>
            ${role === "teacher" ? `<td><button onclick="editGrade(${i})">✏️</button></td>` : ""}
        </tr>`;
    });

    html += "</table>";

    html += `<div class="avg-box">
        <strong>📊 Átlagok:</strong>
        ${calculateAverages()}
    </div>`;

    app.innerHTML = html;
}

function editGrade(index) {
    const newGrade = prompt("Új jegy:");
    if (newGrade) {
        grades[index].grade = parseInt(newGrade);
        render();
    }
}

function calculateAverages() {
    let subjects = {};

    grades.forEach(g => {
        if (!subjects[g.subject]) subjects[g.subject] = [];
        subjects[g.subject].push(g.grade);
    });

    let html = "<ul>";

    for (let s in subjects) {
        let avg = subjects[s].reduce((a, b) => a + b) / subjects[s].length;
        html += `<li>${s}: <strong>${avg.toFixed(2)}</strong></li>`;
    }

    html += "</ul>";
    return html;
}

document.getElementById("role").addEventListener("change", render);
render();