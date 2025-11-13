document.getElementById("generateJSON").addEventListener("click", () => {
    const form = document.getElementById("introForm");
    const result = document.getElementById("result");

    // Collect values
    const data = {
        firstName: form.firstName.value,
        middleInitial: form.middleName.value,
        preferredName: form.nickname.value,
        lastName: form.lastName.value,
        mascot: form.mascot.value,
        divider: form.divider.value,
        caption: form.caption.value,
        personalBackground: form.personalBg.value,
        professionalBackground: form.professionalBg.value,
        academicBackground: form.academicBg.value,
        primaryComputer: form.computer.value,
        personalStatement: form.personalStatement.value,
        quote: form.quote.value,
        author: form.author.value,
        courses: []
    };

    document.querySelectorAll(".course").forEach(c => {
        data.courses.push({
            dept: c.querySelector("input[name='dept']").value,
            number: c.querySelector("input[name='num']").value,
            name: c.querySelector("input[name='name']").value,
            reason: c.querySelector("input[name='reason']").value
        });
    });

    // Display formatted JSON
    result.innerHTML = `
<pre><code class="language-json">${JSON.stringify(data, null, 2)}</code></pre>
`;

    document.querySelector("h2").innerText = "Introduction JSON";

    hljs.highlightAll();
});