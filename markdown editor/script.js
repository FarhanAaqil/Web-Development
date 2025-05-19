// Initialize marked.js for Markdown rendering
marked.setOptions({
  breaks: true,
});

// DOM Elements
const markdownInput = document.getElementById("markdown-input");
const previewPane = document.getElementById("preview-pane");
const exportHTMLButton = document.getElementById("export-html");
const exportPDFButton = document.getElementById("export-pdf");
const toggleThemeButton = document.getElementById("toggle-theme");
const wordCountDisplay = document.getElementById("word-count");

// Live Preview Functionality
markdownInput.addEventListener("input", () => {
  const markdownText = markdownInput.value;
  const htmlContent = marked.parse(markdownText);
  previewPane.innerHTML = htmlContent;

  // Update word and character count
  const words = markdownText.match(/\b\w+\b/g) || [];
  const characters = markdownText.replace(/\s+/g, "").length;
  wordCountDisplay.textContent = `Word Count: ${words.length} | Character Count: ${characters}`;
});

// Export to HTML
exportHTMLButton.addEventListener("click", () => {
  const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Exported HTML</title>
      </head>
      <body>
        ${previewPane.innerHTML}
      </body>
      </html>
    `;
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "exported.html";
  a.click();
  URL.revokeObjectURL(url);
});

// Export to PDF
exportPDFButton.addEventListener("click", () => {
  html2pdf().from(previewPane).save("exported.pdf");
});

// Toggle Dark Mode
let isDarkMode = false;
toggleThemeButton.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode", isDarkMode);
  toggleThemeButton.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
});

// Auto-Save to LocalStorage
markdownInput.addEventListener("input", () => {
  localStorage.setItem("savedMarkdown", markdownInput.value);
});

// Load Saved Content on Page Load
window.addEventListener("load", () => {
  const savedMarkdown = localStorage.getItem("savedMarkdown");
  if (savedMarkdown) {
    markdownInput.value = savedMarkdown;
    previewPane.innerHTML = marked.parse(savedMarkdown);
  }
});
