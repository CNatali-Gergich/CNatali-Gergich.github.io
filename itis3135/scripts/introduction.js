document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("introForm");
  const resultDiv = document.getElementById("result");
  const clearButton = document.getElementById("clearButton");
  const addCourseBtn = document.getElementById("addCourse");
  const coursesContainer = document.getElementById("coursesContainer");

  // Prevent full page refresh
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    showResults();
  });

  // Reset button restores default values
  form.addEventListener("reset", () => {
    resultDiv.innerHTML = "";
    form.style.display = "block";
  });

  // Clear button empties all fields
  clearButton.addEventListener("click", () => {
    form.reset();
    Array.from(form.querySelectorAll("input, textarea")).forEach((input) => {
      input.value = "";
    });
  });

  // Add Course button opens modal
  addCourseBtn.addEventListener("click", () => {
    openCourseModal();
  });

  // Delete course
  coursesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteCourse")) {
      e.target.closest(".course").remove();
    }
  });

  // Modal builder
  function openCourseModal() {
    const modal = document.createElement("div");
    modal.classList.add("modal-overlay");
    modal.innerHTML = `
      <div class="modal">
        <h3>Add Course</h3>
        <label>Prefix <input type="text" id="modalDept" placeholder="ITIS" required></label>
        <label>Number <input type="text" id="modalNum" placeholder="3135" required></label>
        <label>Course Name <input type="text" id="modalName" placeholder="Course Name" required></label>
        <label>Reason <textarea id="modalReason" placeholder="Why you're taking the course..." required></textarea></label>
        <div class="modal-actions">
          <button id="cancelModal">Cancel</button>
          <button id="saveModal">Add</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById("cancelModal").addEventListener("click", () => modal.remove());
    document.getElementById("saveModal").addEventListener("click", () => {
      const dept = document.getElementById("modalDept").value.trim();
      const num = document.getElementById("modalNum").value.trim();
      const name = document.getElementById("modalName").value.trim();
      const reason = document.getElementById("modalReason").value.trim();

      if (dept && num && name && reason) {
        const newCourse = document.createElement("div");
        newCourse.classList.add("course");
        newCourse.innerHTML = `
          <input type="text" name="dept[]" value="${dept}" required>
          <input type="text" name="num[]" value="${num}" required>
          <input type="text" name="name[]" value="${name}" required>
          <input type="text" name="reason[]" value="${reason}" required>
          <div class="course-actions">
            <button type="button" class="deleteCourse">Delete</button>
          </div>
        `;
        coursesContainer.insertBefore(newCourse, addCourseBtn);
        modal.remove();
      } else {
        alert("Please fill out all fields before adding.");
      }
    });
  }

  // Build results
function showResults() {
  const data = Object.fromEntries(new FormData(form).entries());
  const fileInput = form.querySelector("input[name='picture']");
  let imageURL = "images/IMG_0356.jpg";

  if (fileInput.files && fileInput.files[0]) {
    imageURL = URL.createObjectURL(fileInput.files[0]);
  }

  const courseList = Array.from(form.querySelectorAll(".course")).map(course => {
    const [dept, num, name, reason] = course.querySelectorAll("input");
    return `<li><strong>${dept.value} ${num.value} - ${name.value}:</strong> ${reason.value}</li>`;
  }).join("");

  resultDiv.innerHTML = `
  <div class="card">
      <h2>Introduction</h2>
      <h2>${data.firstName} ${data.lastName}</h2>
      <figure>
          <img src="${imageURL}" alt="Photo of ${data.firstName}" style="max-width:300px; max-height:300px; display:block; margin:1rem auto;">
          <figcaption style="text-align:center;">${data.caption}</figcaption>
      </figure>
      <p>${data.personalStatement}</p>

      <ul>
          <li><strong>Personal Background:</strong> ${data.personalBg}</li>
          <li><strong>Professional Background:</strong> ${data.professionalBg}</li>
          <li><strong>Academic Background:</strong> ${data.academicBg}</li>
          <li><strong>Primary Computer:</strong> ${data.computer}</li>
          <li>
              <strong>Courses I'm Taking, & Why:</strong>
              <ul>${courseList}</ul>
          </li>
      </ul>

      <blockquote style="text-align:center; margin-top:2rem;">
          <p>“${data.quote}”</p>
          <footer>- ${data.author}</footer>
      </blockquote>
  </div>
  `;

  // Hide the form once submitted
  form.style.display = "none";
}
});