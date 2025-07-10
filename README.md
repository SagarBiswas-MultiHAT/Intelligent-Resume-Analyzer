# Intelligent Resume Analyzer & Builder

A modern web application that uses AI to analyze and improve your resume. Upload your resume (PDF or DOCX), get actionable suggestions, and see examples of top-quality resume sections.

<br></br>
![](https://imgur.com/a/Hec5rlr.png)
<br></br>

---

## Features

- **AI-Powered Resume Analysis:** Upload your resume and receive detailed, actionable suggestions for improvement.
- **Concrete Examples:** See rewritten sections and examples based on your resume.
- **AI Resume Rating:** Get an overall score for your resume (1–10 scale).
- **Downloadable Results:** Download the analysis and suggestions as a text file.
- **Modern UI:** Clean, responsive, and beginner-friendly interface.

---

## Project Structure

- `backend/` — Flask backend for resume analysis (Python)
- `frontend/` — HTML, CSS, and JavaScript frontend

---

## Setup Instructions

### 1. Backend Setup

1. **Install Python dependencies:**
   ```sh
   pip install -r backend/requirements.txt
   ```
2. **Download spaCy English model:**
   ```sh
   python -m spacy download en_core_web_sm
   ```
3. **Set your GROQ API key as an environment variable:**
   - On Windows (PowerShell):
     ```sh
     $env:GROQ_API_KEY="your_groq_api_key_here"
     ```
   - On Linux/macOS:
     ```sh
     export GROQ_API_KEY="your_groq_api_key_here"
     ```
4. **Run the backend server:**
   ```sh
   python backend/app.py
   ```
   The backend will start at `http://localhost:5000`.

### 2. Frontend Setup

1. Open `frontend/index.html` in your web browser.
   - No build tools or server required for the frontend.

---

## Usage

1. Click **Upload Resume** and select a PDF or DOCX file.
2. Wait for the AI to analyze your resume.
3. View suggestions, rating, and example sections.
4. Click **Download Analysis** to save the results.

---

## Requirements

- Python 3.7+
- Internet connection (for AI analysis)
- Modern web browser (Chrome, Edge, Firefox, etc.)

---

## Backend Dependencies

- Flask
- flask-cors
- spacy
- pdfminer.six
- python-docx

---

## Security & Privacy

- Your resume is processed locally and sent to the AI API for analysis. No data is stored after analysis.
- Always keep your API keys private.

---

## Credits

- Built by the Resume Analyzer Team
- Powered by [spaCy](https://spacy.io/), [Flask](https://flask.palletsprojects.com/), and [GROQ API](https://groq.com/)

---

## License

This project is for educational and personal use. See `LICENSE` for more details.
