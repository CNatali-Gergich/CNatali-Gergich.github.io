document.getElementById("generateHTML").addEventListener("click", () => {
    const form = document.getElementById("introForm");
    const result = document.getElementById("result");

    // Extract fields
    const firstName = form.firstName.value;
    const lastName  = form.lastName.value;
    const caption   = form.caption.value;

    const personalBg = form.personalBg.value;
    const professionalBg = form.professionalBg.value;
    const academicBg = form.academicBg.value;
    const computer = form.computer.value;
    const personalStatement = form.personalStatement.value;

    const quote = form.quote.value;
    const author = form.author.value;

    // ⭐ ADDED: uploaded image OR fallback
    let imageURL = "images/IMG_0356.jpg"; // default image
    const fileInput = form.querySelector("input[name='picture']");
    if (fileInput.files && fileInput.files[0]) {
        imageURL = URL.createObjectURL(fileInput.files[0]); // user image
    }

    // Build course list exactly like intro.html
    let coursesHTML = "";
    document.querySelectorAll(".course").forEach((c) => {
        const dept = c.querySelector("input[name='dept']").value;
        const num = c.querySelector("input[name='num']").value;
        const name = c.querySelector("input[name='name']").value;
        const reason = c.querySelector("input[name='reason']").value;

        coursesHTML += 
`            <li><strong>${dept} ${num} - ${name}:</strong> ${reason}</li>
`;
    });

    // Final HTML output EXACTLY matching intro.html
    const htmlOutput =
`<h2>Introduction</h2>
<h2>${firstName} ${lastName}</h2>

<figure>
    <img src="${imageURL}" alt="Photo" style="max-width:300px; max-height:300px; display:block; margin:1rem auto;">
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
${coursesHTML}        </ul>
    </li>
</ul>

<blockquote style="text-align:center; margin-top:2rem;">
    <p>“${quote}”</p>
    <footer>- ${author}</footer>
</blockquote>`;

    result.innerHTML = `
<pre><code class="language-html">${htmlOutput.replace(/</g, "&lt;")}</code></pre>
`;

    hljs.highlightAll();
});