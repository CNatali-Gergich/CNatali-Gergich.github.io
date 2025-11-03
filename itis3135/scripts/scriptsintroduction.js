document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("introForm");
  const resultDiv = document.getElementById("result");
  const addCourseBtn = document.getElementById("addCourse");
  const clearButton = document.getElementById("clearButton");
  const coursesContainer = document.getElementById("coursesContainer");

  form.addEventListener("submit", e => {
    e.preventDefault();
    showResults();
  });

  clearButton.addEventListener("click", () => {
    form.reset();
    Array.from(form.querySelectorAll("input, textarea")).forEach(i => i.value = "");
  });

  addCourseBtn.addEventListener("click", () => {
    const course = document.createElement("div");
    course.className = "course";
    course.innerHTML = `
      <input type="text" name="dept[]" placeholder="Dept" required>
      <input type="text" name="num[]" placeholder="Number" required>
      <input type="text" name="name[]" placeholder="Name" required>
      <input type="text" name="reason[]" placeholder="Reason" required>
      <div class="course-actions">
        <button type="button" class="deleteCourse">Delete</button>
      </div>
    `;
    coursesContainer.insertBefore(course, addCourseBtn);
  });

  coursesContainer.addEventListener("click", e => {
    if (e.target.classList.contains("deleteCourse")) {
      e.target.closest(".course").remove();
    }
  });

  function showResults() {
    const data = Object.fromEntries(new FormData(form).entries());
    const fileInput = form.querySelector("input[name='picture']");
    let imageURL = "images/IMG_0356.jpg";
    if (fileInput.files && fileInput.files[0]) {
      imageURL = URL.createObjectURL(fileInput.files[0]);
    }

    const courseList = Array.from(form.querySelectorAll(".course")).map(course => {
      const [dept, num, name, reason] = course.querySelectorAll("input");
      return `<li><strong>${dept.value} ${num.value} — ${name.value}:</strong> ${reason.value}</li>`;
    }).join("");

    resultDiv.innerHTML = `
      <h2>Introduction</h2>
      <h2>${data.firstName} ${data.lastName}</h2>
      <figure>
        <img src="${imageURL}" alt="Photo of ${data.firstName}">
        <figcaption>${data.caption}</figcaption>
      </figure>
      <p>${data.personalStatement}</p>
      <ul>
        <li><strong>Personal Background:</strong> ${data.personalBg}</li>
        <li><strong>Professional Background:</strong> ${data.professionalBg}</li>
        <li><strong>Academic Background:</strong> ${data.academicBg}</li>
        <li><strong>Primary Computer:</strong> ${data.computer}</li>
        <li><strong>Courses I'm Taking & Why:</strong><ul>${courseList}</ul></li>
      </ul>
      <blockquote><p>“${data.quote}”</p><footer>- ${data.author}</footer></blockquote>
      <p><a href="#" onclick="location.reload()">Reset Form</a></p>
    `;
    form.style.display = "none";
  }
});