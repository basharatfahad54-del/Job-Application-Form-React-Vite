# Job Application Form (React + Vite + Tailwind CSS)

A fully functional, responsive **Job Application Form** built with **React.js, JavaScript and Tailwind CSS**, featuring rich conditional rendering and dynamic validation.

## ✨ Features

- **Personal Information** — full name, email, phone, date of birth, gender, address, city, country
- **Job Information** — position applied for, employment type, expected salary, joining date
- **Conditional Fields**:
  - Employment Type → `Other` shows a *Specify Employment Type* input
  - `Experienced` → previous company, job title, years of experience, previous salary, reason for leaving, notice period
  - `Fresher` → internship Yes/No, academic projects, relevant skills
  - Internship → `Yes` shows internship company + duration
  - Highest Qualification → `Other` shows a *Specify Qualification* input
- **Skills & Documents** — technical/professional skills, resume upload (PDF/DOC/DOCX, max 5 MB), optional portfolio & LinkedIn URLs
- **Dynamic validation** — only visible/applicable fields are validated, errors display under each field and clear as you correct inputs
- **Progress indicator** — live completion bar with per-section checkmarks
- **Success screen** — green confirmation with the applicant's name, position and summary; form resets after submission

## 🧠 React concepts demonstrated

Conditional rendering (`&&` / ternary), controlled components, form handling with `preventDefault`, reusable validation functions, `useState` / `useEffect` / `useRef`, lifting state up (all form state lives in `App.jsx`), and rendering lists with `.map()`.

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## 📁 Project structure

```
src/
├── components/
│   ├── PersonalInfo.jsx
│   ├── JobDetails.jsx
│   ├── ExperienceDetails.jsx
│   ├── EducationDetails.jsx
│   ├── SkillsAndDocuments.jsx
│   ├── FormSuccess.jsx
│   └── FormField.jsx
├── validation/
│   └── validateForm.js
├── App.jsx
├── main.jsx
└── index.css
```
