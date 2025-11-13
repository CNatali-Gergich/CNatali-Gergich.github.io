document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("introForm");
  const resultDiv = document.getElementById("result");
  const clearButton = document.getElementById("clearButton");
  const addCourseBtn = document.getElementById("addCourse");
  const coursesContainer = document.getElementById("coursesContainer");

  // ---------------------------
  // SUBMIT → SHOW INTRO CARD
  // ---------------------------
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    const fileInput = form.querySelector("input[name='picture']");
    let imageURL = "images/IMG_0356.jpg";

    if (fileInput.files && fileInput.files[0]) {
      imageURL = URL.createObjectURL(fileInput.files[0]);
    }

    // Build course list safely
    const courseList = Array.from(coursesContainer.querySelectorAll(".course"))
      .map(course => {
        const dept = course.querySelector("input[name='dept']");
        const num = course.querySelector("input[name='num']");
        const name = course.querySelector("input[name='name']");
        const reason = course.querySelector("input[name='reason']");
        return `<li><strong>${dept.value} ${num.value} - ${name.value}:</strong> ${reason.value}</li>`;
      })
      .join("");

    resultDiv.innerHTML = `
      <div class="card">
        <h2>Introduction</h2>
        <h2>${data.firstName} ${data.lastName}</h2>

        <figure>
          <img src="${imageURL}" alt="Photo of ${data.firstName}"
            style="max-width:300px; max-height:300px; display:block; margin:1rem auto;">
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

    form.style.display = "none";
  });

  // ---------------------------
  // RESET FORM
  // ---------------------------
  form.addEventListener("reset", () => {
    resultDiv.innerHTML = "";
    form.style.display = "block";
  });

  // ---------------------------
  // CLEAR ALL FIELDS
  // ---------------------------
  clearButton.addEventListener("click", () => {
    form.reset();
    form.querySelectorAll("input, textarea").forEach(input => input.value = "");
  });

  // ---------------------------
  // ADD COURSE (MODAL)
  // ---------------------------
  addCourseBtn.addEventListener("click", openCourseModal);

  // ---------------------------
  // DELETE COURSE
  // ---------------------------
  coursesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteCourse")) {
      e.target.closest(".course").remove();
    }
  });
});

// ---------------------------
// MODAL BUILDER
// ---------------------------
function openCourseModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal-overlay");
  modal.innerHTML = `
    <div class="modal">
      <h3>Add Course</h3>
      <label>Prefix <input type="text" id="modalDept" required></label>
      <label>Number <input type="text" id="modalNum" required></label>
      <label>Course Name <input type="text" id="modalName" required></label>
      <label>Reason <textarea id="modalReason" required></textarea></label>

      <div class="modal-actions">
        <button id="cancelModal">Cancel</button>
        <button id="saveModal">Add</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);

  document.getElementById("cancelModal").onclick = () => modal.remove();
  
  document.getElementById("saveModal").onclick = () => {
    const dept = modalDept.value.trim();
    const num = modalNum.value.trim();
    const name = modalName.value.trim();
    const reason = modalReason.value.trim();

    if (dept && num && name && reason) {
      const newCourse = document.createElement("div");
      newCourse.classList.add("course");
      newCourse.innerHTML = `
        <input type="text" name="dept" value="${dept}" required>
        <input type="text" name="num" value="${num}" required>
        <input type="text" name="name" value="${name}" required>
        <input type="text" name="reason" value="${reason}" required>
        <div class="course-actions">
          <button type="button" class="deleteCourse">Delete</button>
        </div>
      `;
      document.getElementById("coursesContainer").insertBefore(newCourse, document.getElementById("addCourse"));
      modal.remove();
    } else {
      alert("Fill out all fields.");
    }
  };
}