# dataView
# 🏢 Data Center Lead Generator

A responsive React application that allows users to input facility details and generate qualified data center leads by searching a local CSV file. Built with Material UI and designed for desktop and mobile use.

---

## 📸 Preview

![screenshot](./screenshot.png) <!-- Optional: Add your screenshot file here -->

---

## ⚙️ Features

- 🧠 Smart form validation (latitude & longitude required, others optional)
- 📄 Searches local CSV file for matching results
- 📋 Responsive UI using Material UI (mobile-friendly)
- 📦 Modular components: Form, Validation, Results Cards
- ⏳ Loading bar feedback after search
- ✅ Matching logic with flexible filters

---

## 🛠 Tech Stack

| Tool        | Purpose                      |
|-------------|------------------------------|
| React       | UI and state management      |
| Material UI | Layout, components, styling  |
| Vite        | Fast dev environment         |
| PapaParse   | CSV file parsing             |

---

## 📁 Project Structure

├── public/
│ └── leads.csv # Your local data file
├── src/
│ ├── components/
│ │ ├── Form.jsx # Presentational form
│ │ ├── ResultCard.jsx # Styled result display
│ │ └── ResultsList.jsx # Maps results into cards
│ ├── containers/
│ │ └── FormContainer.jsx # State, validation, filtering
│ ├── utils/
│ │ ├── csv.js # CSV fetch and parser
│ │ └── validation.js # Input validation functions
│ └── pages/
│ └── Home.jsx # Page layout and centering


---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/data-center-lead-generator.git
cd data-center-lead-generator

2. Install Dependencies
bash
Copy
Edit
npm install
3. Run the App
bash
Copy
Edit
npm run dev
4. Add Your Data
Place your leads.csv inside the public/ folder with this structure:

csv
Copy
Edit
id,company,dataCenter,latitude,longitude,capacity,term,spend,dealValue,status,segment
1,Acme,NorthDC,40.1,-74.2,12,18,2.5,55000,Active Search,Enterprise
