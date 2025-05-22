# Dcide – Roneon's Project

**Dcide** is a data-driven lead generation tool designed to help users identify relevant data center facilities within a defined geographic radius, filtered by business-specific criteria such as certifications, industry, and MW capacity.

---

## 🔧 Features

- 📍 **Geolocation filtering** — enter latitude, longitude, and radius to find matching facilities
- 🗃️ **Real-time data** — integrates with external APIs or databases (e.g., Supabase, Xano)
- 🧠 **Smart filters** — optional fields like company, industry, MW capacity, certifications
- 📊 **Custom results UI** — clean, responsive result cards with distance, specs, and metadata
- 🔄 **Form reset** — clear inputs instantly
- ⏳ **Loading feedback** — see when search is processing

---

## 🚀 Tech Stack

- **Frontend**: React + Vite + Material UI (MUI)
- **API**: Supabase / Xano
- **Geospatial Logic**: Haversine formula for distance calculation
- **CSV Support**: fallback for local testing

---

## 📁 Folder Structure

/public
└── leads.csv # Optional fallback CSV

/src
├── components/
│ ├── Form.jsx # Presentational form
│ ├── FormContainer.jsx # Logic, state, validation
│ ├── ResultCard.jsx # Styled result display
│ ├── ResultsList.jsx # Maps results to cards
│ └── loading.jsx # Loading animation
├── utils/
│ ├── distance.js # Haversine formula
│ └── validation.js # Input validation
| └── api.js #All API calls and filtration logic
| └── supabaseClient.js - optional if we decide to migrate to supabase
└── pages/
└── Home.jsx # Layout


---

## 🧪 Running the Project

```bash
# Clone the repo
git clone https://github.com/Dcide-Roneon/dataView.git

# Install dependencies
npm install

# Start dev server
npm run dev
