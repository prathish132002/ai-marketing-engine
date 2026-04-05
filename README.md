# AI Marketing Engine ⚡

A full-stack, enterprise-grade AI marketing suite designed to generate hyper-personalized, brand-aligned content at scale. This application acts as a digital marketing department, utilizing **Claude (Anthropic)** to orchestrate branding, cross-platform content creation, psychological ad variant testing, and qualitative sentiment analysis.

---

## 🛠️ System Architecture

- **Frontend:** React (Vite) + Tailwind CSS + React Router + Zustand (Persistent State)
- **Backend:** Python (FastAPI) + Uvicorn + Pydantic
- **Database:** SQLite (via SQLAlchemy ORM)
- **AI Core:** Anthropic API (Claude 3.5 Sonnet)

---

## 🧩 The 6 Core Modules

This application is built symmetrically. Every module features a highly specific React frontend dashboard that connects to a dedicated FastAPI backend route, powered by rigorous Pydantic schema constraints.

### 1. Brand Setup (`/`)
Establishes the "Brain" of the engine. Captures target audience, industry, tones, and keywords. This context is saved to the SQLite database and injected into every subsequent AI generation to ensure output never sounds "generic."

### 2. Content Generation Hub (`/content`)
Generates cross-platform, native copy (LinkedIn, Twitter threads, Instagram captions) instantly out of a single topic prompt, strictly following the rules defined in Module 1.

### 3. Repurposing Map (`/repurpose`)
Takes massive blocks of text (like a YouTube transcript or blog post) and shatters it. It automatically extracts the core thesis, top quotes, and reformats the data into 5 days of multi-platform social media posts.

### 4. Ad Copy & A/B Variants (`/ads`)
Designed for media buyers. Inputs a product and offer, and returns 5 psychologically distinct ad copy angles (Urgency, Logical, Emotional, etc.) mapped into a side-by-side comparative grid UI.

### 5. VoC Sentiment Analytics (`/sentiment`)
Qualitative Voice of Customer (VoC) tool. Paste 500 messy Trustpilot or Amazon reviews, and the engine calculates the Positive/Neutral/Negative split, extracts the top thematic pain points, and provides actionable strategic recommendations.

### 6. Timeline Calendar Grid (`/calendar`)
Input a month, and the engine determines the optimal 30-day posting schedule, mapping out specific platforms, content types, exact topics, and best times to post on a sequential timeline.

---

## 🚀 Setup & Installation Instructions

This project requires two terminals running simultaneously (one for the backend, one for the frontend).

### 1. Backend Setup (FastAPI)

Open your first terminal and navigate to the `backend` folder:
```bash
cd backend
```

Install the required Python dependencies:
```bash
pip install -r requirements.txt
```

Set up your Environment Variables:
Create a `.env` file inside the `backend` folder and add your Claude API key:
```env
ANTHROPIC_API_KEY=sk-ant-api03-...
```

Boot the API server:
```bash
python -m uvicorn app.main:app --reload --port 8000
```
*Note: SQLite uses `sqlite:///./marketing_engine.db` locally. The framework will auto-generate the file and tables when booted.*

### 2. Frontend Setup (React/Vite)

Open a second terminal and navigate to the `frontend` folder:
```bash
cd frontend
```

Install the NPM dependencies:
```bash
npm install
```

Boot the Vite Development Server:
```bash
npm run dev
```

Click the resulting localhost link (usually `http://localhost:5173`) to open the AI Marketing Engine in your browser!

---

## 🤝 Project State
Fully operational. Global routing is managed via `react-router-dom`, persistent data caching via `zustand`, and backend API networking via a unified `axios` client targeting `http://localhost:8000/api`.
