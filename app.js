const status = document.getElementById("status");

// Flags tags, encoded tags/entities, javascript:/data: URLs, and inline handlers (onerror=...)
const SUSPICIOUS = /[<>]|&(#|lt|gt)|%3c|%3e|(javascript|data)\s*:|\bon\w+\s*=/i;

function setStatus(message, ok) {
  status.textContent = message;
  status.className = ok ? "success" : "warning";
}

function display(input, output) {
  const value = input.value.trim();
  output.textContent = ""; // always clear first so nothing stale remains

  if (!value) return setStatus("Please enter a message.", false);

  if (SUSPICIOUS.test(value)) {
    input.value = "";
    return setStatus("Blocked: suspicious input was detected and not displayed.", false);
  }

  output.textContent = value; // textContent = plain text, never parsed as HTML
  setStatus("Input accepted and shown as plain text.", true);
}

const messageInput = document.getElementById("messageInput");
const messageOutput = document.getElementById("messageOutput");
const domInput = document.getElementById("domInput");
const domOutput = document.getElementById("domOutput");

document.getElementById("messageForm").addEventListener("submit", (e) => {
  e.preventDefault();
  display(messageInput, messageOutput);
});

document.getElementById("domButton").addEventListener("click", () => {
  display(domInput, domOutput);
});