document.getElementById("generateJSON").addEventListener("click", () => {
    const form = document.getElementById("introForm");
    const result = document.getElementById("result");

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

    document.querySelectorAll(".course").forEach((c) => {
        data.courses.push({
            dept: c.querySelector("input[name='dept']").value,
            number: c.querySelector("input[name='num']").value,
            name: c.querySelector("input[name='name']").value,
            reason: c.querySelector("input[name='reason']").value
        });
    });

    // Pretty JSON with clean spacing
    const jsonFormatted = JSON.stringify(data, null, 4);

    result.innerHTML = `
<pre><code class="language-json">${jsonFormatted}</code></pre>
`;

    hljs.highlightAll();
});