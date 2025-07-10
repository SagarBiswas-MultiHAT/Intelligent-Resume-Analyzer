// -----------------------------
// Resume Analyzer Frontend Script
// This JavaScript file handles all the main interactions for the Resume Analyzer web app.
// Detailed comments are provided for beginners to understand each part of the code.
// -----------------------------

// Stores the last analysis text for download
let lastAnalysisText = "";
// Stores the last resume text sent for analysis (if needed for future use)
let lastAnalysisRequest = null;

// This function is called when the user clicks the 'Upload Resume' button
function uploadResume() {
  // Get the file input element by its ID
  const fileInput = document.getElementById("resumeUpload");
  // Get the first file selected by the user
  const file = fileInput.files[0];
  // If no file is selected, show an alert and stop
  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  // Create a FormData object to send the file to the backend
  const formData = new FormData();
  formData.append("resume", file); // 'resume' is the key expected by the backend

  // Get references to UI elements for showing loading and suggestions
  const loadingDiv = document.getElementById("loading");
  const suggestionsDiv = document.getElementById("suggestions");
  // Get the upload button (to change its text after upload)
  const uploadBtn = document.querySelector('button[onclick="uploadResume()"]');
  // Show the loading message
  loadingDiv.style.display = "block";
  // Clear previous suggestions
  suggestionsDiv.innerHTML = "";

  // Send the file to the backend using fetch API
  fetch("http://localhost:5000/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => {
      // Hide the loading message
      loadingDiv.style.display = "none";
      // Get the download button
      const downloadBtn = document.getElementById("downloadBtn");
      // Change the upload button text after first upload
      if (uploadBtn) uploadBtn.textContent = "Regenerate Suggestions";
      // If AI suggestions are present in the response
      if (data.ai_suggestions) {
        let ratingHtml = "";
        // If AI rating is present, show it
        if (data.ai_rating) {
          ratingHtml = `<div class=\"rating-section\"><strong>AI Resume Rating:</strong> <span class=\"rating-value\">${data.ai_rating} / 10</span></div>`;
        }
        // Convert **text** to <strong>text</strong> for bold formatting
        let suggestionsHtml = data.ai_suggestions.replace(
          /\*\*(.*?)\*\*/g,
          "<strong>$1</strong>"
        );
        // Highlight example/rewrite lines (e.g., 'For example:' or 'Instead of:')
        suggestionsHtml = suggestionsHtml.replace(
          /^(\s*[-*]?\s*)(For example:|Instead of:)(.*)$/gim,
          function (match, p1, p2, p3) {
            return `${p1}<span class=\"example-highlight\"><strong>${p2}</strong>${p3}</span>`;
          }
        );
        let exampleHtml = "";
        // If an example section is present, show it
        if (data.ai_example) {
          exampleHtml = `<div class=\"example-section\"><h3>10/10 Example Section</h3><pre>${data.ai_example}</pre></div>`;
        }
        // Display the suggestions and rating in the suggestions div
        suggestionsDiv.innerHTML =
          ratingHtml +
          "<h2>AI Suggestions:</h2><pre>" +
          suggestionsHtml +
          "</pre>" +
          exampleHtml;
        // Prepare plain text for download
        lastAnalysisText = `AI Resume Rating: ${
          data.ai_rating ? data.ai_rating + " / 10" : ""
        }\n\nSuggestions:\n${data.ai_suggestions}\n\n10/10 Example Section:\n${
          data.ai_example || ""
        }`;
        // Show the download button
        downloadBtn.classList.add("show");
        // Store the resume text if provided
        if (data.resume_text) lastAnalysisRequest = data.resume_text;
      } else if (data.suggestions) {
        // If only basic suggestions are present (fallback)
        suggestionsDiv.innerHTML =
          "<h2>Suggestions:</h2>" +
          data.suggestions.map((s) => `<p>${s}</p>`).join("");
        lastAnalysisText = data.suggestions.join("\n");
        downloadBtn.classList.add("show");
      } else if (data.error) {
        // If there was an error, show it
        suggestionsDiv.innerHTML = `<div class='error-message'>${data.error}</div>`;
        lastAnalysisText = "";
        downloadBtn.classList.remove("show");
      }
    })
    .catch((error) => {
      // If there was a network or server error
      loadingDiv.style.display = "none";
      lastAnalysisText = "";
      document.getElementById("downloadBtn").classList.remove("show");
      console.error("Error:", error);
      alert("An error occurred while uploading the resume. Please try again.");
    });
}

// Add a click event listener to the download button
// When clicked, it will download the last analysis as a text file
// This uses the Blob and URL APIs to create a downloadable file in the browser
// The file will be named 'resume_analysis.txt'
document.getElementById("downloadBtn").addEventListener("click", function () {
  if (!lastAnalysisText) return; // If there is nothing to download, do nothing
  const blob = new Blob([lastAnalysisText], { type: "text/plain" });
  const url = URL.createObjectURL(blob); // Create a temporary URL for the blob
  const a = document.createElement("a"); // Create a temporary <a> element
  a.href = url;
  a.download = "resume_analysis.txt"; // Set the file name
  document.body.appendChild(a); // Add the <a> to the page
  a.click(); // Simulate a click to start download
  setTimeout(() => {
    document.body.removeChild(a); // Remove the <a> after download
    URL.revokeObjectURL(url); // Release the blob URL
  }, 0);
});
