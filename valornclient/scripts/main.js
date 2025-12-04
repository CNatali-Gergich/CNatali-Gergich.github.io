/*
  File: main.js
  Author: Your Name
  Project: Valorn Gaming Client Site
  Description:
    Site-wide interactivity:
    - Dark mode theme toggle (all pages)
    - Twitch LIVE banner on home page
    - "Read more" toggle on About page
    - Collab form character counter + validation
*/

document.addEventListener('DOMContentLoaded', () => {
  // =========================
  // DARK MODE TOGGLE (all pages)
  // =========================
  const body = document.body;
  const storedTheme = localStorage.getItem('valorn-theme');

  // Apply stored theme on load
  if (storedTheme === 'dark') {
    body.classList.add('dark-theme');
  }

  // Use event delegation so it works even though header is injected
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-theme-toggle]');
    if (!button) return;

    const isDark = body.classList.toggle('dark-theme');
    button.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('valorn-theme', isDark ? 'dark' : 'light');
  });

  // =========================
  // TWITCH LIVE BANNER (home page only)
  // =========================
  const liveBanner = document.getElementById('live-banner');

  if (liveBanner) {
    const twitchUser = 'valorn987';
    const iframe = document.createElement('iframe');
    const parentDomain = window.location.hostname;

    iframe.src = `https://player.twitch.tv/?channel=${twitchUser}&parent=${parentDomain}`;
    iframe.width = 1;
    iframe.height = 1;
    iframe.style.display = 'none';

    document.body.appendChild(iframe);

    iframe.onload = () => {
      liveBanner.style.display = 'block';
    };

    iframe.onerror = () => {
      liveBanner.style.display = 'none';
    };

    liveBanner.addEventListener('click', () => {
      window.open('https://twitch.tv/valorn987', '_blank');
    });
  }

  // =========================
  // ABOUT PAGE "READ MORE" TOGGLE
  // =========================
  const aboutToggleButton = document.getElementById('about-toggle');
  const aboutMore = document.getElementById('about-more');

  if (aboutToggleButton && aboutMore) {
    aboutToggleButton.addEventListener('click', () => {
      const isOpen = aboutMore.classList.toggle('open');
      aboutToggleButton.textContent = isOpen ? 'Show less' : 'Read more';
    });
  }

  // =========================
  // COLLAB FORM: CHAR COUNTER + VALIDATION
  // =========================
  const collabForm = document.getElementById('collab-form');

  if (collabForm) {
    const messageField = document.getElementById('message');
    const messageCount = document.getElementById('message-count');
    const formStatus = document.getElementById('form-status');
    const maxChars = parseInt(messageField.getAttribute('maxlength') || '300', 10);

    // Character counter
    if (messageField && messageCount) {
      const updateCount = () => {
        const remaining = maxChars - messageField.value.length;
        messageCount.textContent = `${remaining} characters remaining`;
      };

      updateCount();
      messageField.addEventListener('input', updateCount);
    }

    // Basic validation on submit
    collabForm.addEventListener('submit', (event) => {
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const platformSelect = document.getElementById('platform');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !platformSelect.value) {
        event.preventDefault(); // only block if fields missing
        if (formStatus) {
          formStatus.textContent = 'Please fill in all fields before sending.';
          formStatus.classList.remove('hidden', 'success');
          formStatus.classList.add('error');
        }
        return;
      }

      if (formStatus) {
        formStatus.textContent = 'Sending your message...';
        formStatus.classList.remove('hidden', 'error');
        formStatus.classList.add('success');
      }
      // allow normal submit to formsubmit.co
    });
  }
});