document.addEventListener("DOMContentLoaded", function() {
    const studentForm = document.getElementById("studentForm");
    const studentTableBody = document.getElementById("studentTableBody");

    // Load existing students from local storage
    let students = JSON.parse(localStorage.getItem("students")) || [];

    // Function to render students in the table
    function renderStudents() {
        studentTableBody.innerHTML = "";
        students.forEach((student, index) => {
            const row = document.createElement("tr");
            row.classList.add('trclass');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.studentId}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})"><i class="fa-sharp fa-solid fa-marker"></i></button>
                    <button onclick="deleteStudent(${index})"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            studentTableBody.appendChild(row);
        });
    }

    // Add new student
    studentForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value;
        const studentId = document.getElementById("studentId").value;
        const email = document.getElementById("email").value;
        const contact = document.getElementById("contact").value;

        // Validate inputs
        if (!name || !studentId || !email || !contact) {
            alert("Please fill all fields.");
            return;
        }
        if (isNaN(studentId) || isNaN(contact)) {
            alert("Student ID and Contact No. must be numbers.");
            return;
        }

        const student = { name, studentId, email, contact };
        students.push(student);
        localStorage.setItem("students", JSON.stringify(students));
        renderStudents();
        studentForm.reset();
    });

    // Edit student
    window.editStudent = function(index) {
        const student = students[index];
        document.getElementById("name").value = student.name;
        document.getElementById("studentId").value = student.studentId;
        document.getElementById("email").value = student.email;
        document.getElementById("contact").value = student.contact;

        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        renderStudents();
    };

    // Delete student
    window.deleteStudent = function(index) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        renderStudents();
    };

    // Initial rendering of students
    renderStudents();
});
