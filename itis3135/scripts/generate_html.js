document.getElementById("generateHTML").addEventListener("click", () => {
    const form = document.getElementById("introForm");
    const result = document.getElementById("result");

    // Read basic fields
    const firstName = form.firstName.value;
    const lastName  = form.lastName.value;
    const caption   = form.caption.value;

    const personalStatement = form.personalStatement.value;
    const personalBg = form.personalBg.value;
    const professionalBg = form.professionalBg.value;
    const academicBg = form.academicBg.value;
    const computer = form.computer.value;

    const quote = form.quote.value;
    const author = form.author.value;

    // ⭐ Handle image (uploaded OR default)
    let imageURL = "images/IMG_0356.jpg"; // default image
    const fileInput = form.querySelector("input[name='picture']");
    if (fileInput.files && fileInput.files[0]) {
        imageURL = URL.createObjectURL(fileInput.files[0]); // user's image
    }

    // Build course list
    const courseDivs = document.querySelectorAll(".course");
    let coursesHTML = "";

    let first = true;
    courseDivs.forEach(c => {
        let dept = c.querySelector("input[name='dept']").value;
        let num = c.querySelector("input[name='num']").value;
        let name = c.querySelector("input[name='name']").value;
        let reason = c.querySelector("input[name='reason']").value;

        if (first) {
            // First course: one tab (4 spaces) less
            coursesHTML += `    <li><strong>${dept} ${num} - ${name}:</strong> ${reason}</li>\n`;
            first = false;
        } else {
            // All following courses stay the same as before
        coursesHTML += `        <li><strong>${dept} ${num} - ${name}:</strong> ${reason}</li>\n`;
        }
    });

    // ⭐ Final intro layout EXACTLY matching your real intro page
    const htmlOutput = `
<h2>Introduction</h2>
<h2>${firstName} ${lastName}</h2>

<figure>
    <img src="${imageURL}" 
         alt="Photo of ${firstName} ${lastName}" 
         style="max-width:300px; max-height:300px; display:block; margin:1rem auto;">
    <figcaption style="text-align:center;">${caption}</figcaption>
</figure>

<p>
    ${personalStatement}
</p>

<ul>
    <li><strong>Personal Background:</strong> ${personalBg}</li>
    <li><strong>Professional Background:</strong> ${professionalBg}</li>
    <li><strong>Academic Background:</strong> ${academicBg}</li>
    <li><strong>Primary Computer:</strong> ${computer}</li>
    <li><strong>Courses I'm Taking, & Why:</strong>
        <ul>
    ${coursesHTML}    </ul>
    </li>
</ul>

<blockquote style="text-align:center; margin-top:2rem;">
    <p>“${quote}”</p>
    <footer>- ${author}</footer>
</blockquote>
`;

    // Output to page WITHOUT navigation
    result.innerHTML = `
<pre><code class="language-html">${htmlOutput.replace(/</g, "&lt;")}</code></pre>
`;

    hljs.highlightAll();
});