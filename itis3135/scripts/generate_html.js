document.getElementById("generateHTML").addEventListener("click", () => {
    const form = document.getElementById("introForm");
    const result = document.getElementById("result");

    // Read basic fields
    const firstName = form.firstName.value;
    const middle = form.middleName.value;
    const nickname = form.nickname.value;
    const lastName = form.lastName.value;

    const mascot = form.mascot.value;
    const divider = form.divider.value;

    const caption = form.caption.value;

    const personalBg = form.personalBg.value;
    const professionalBg = form.professionalBg.value;
    const academicBg = form.academicBg.value;
    const computer = form.computer.value;
    const personalStatement = form.personalStatement.value;

    const quote = form.quote.value;
    const author = form.author.value;

    // Collect course list
    const courseDivs = document.querySelectorAll(".course");
    let coursesHTML = "";

    courseDivs.forEach(c => {
        let dept = c.querySelector("input[name='dept']").value;
        let num = c.querySelector("input[name='num']").value;
        let name = c.querySelector("input[name='name']").value;
        let reason = c.querySelector("input[name='reason']").value;

        coursesHTML += `
<li>
  <strong>${dept} ${num}: ${name}</strong> - ${reason}
</li>`;
    });

    // Build HTML output as a string literal
    const htmlOutput = `
<h2>Introduction HTML</h2>

<h3>${firstName} ${middle} ${lastName} ${divider} ${nickname}</h3>

<figure>
  <img src="images/placeholder.jpg" alt="${caption}">
  <figcaption>${caption}</figcaption>
</figure>

<ul>
  <li><strong>Personal Background:</strong> ${personalBg}</li>
  <li><strong>Professional Background:</strong> ${professionalBg}</li>
  <li><strong>Academic Background:</strong> ${academicBg}</li>
  <li><strong>Primary Computer:</strong> ${computer}</li>
</ul>

<p>${personalStatement}</p>

<h3>Courses</h3>
<ul>
${coursesHTML}
</ul>

<blockquote>
  "${quote}" — ${author}
</blockquote>
`;

    // Replace form with output
    result.innerHTML = `
<pre><code class="language-html">${htmlOutput.replace(/</g, "&lt;")}</code></pre>
`;

    document.querySelector("h2").innerText = "Introduction HTML";

    hljs.highlightAll();
});