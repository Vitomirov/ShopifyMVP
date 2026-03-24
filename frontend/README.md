# Shopify AI Store Optimizer (LLM-Powered Analysis Tool)

## Overview

Shopify AI Store Optimizer is a backend-driven analysis system that audits public Shopify stores and generates structured, actionable recommendations using LLMs.

The system ingests real store data (SEO metadata, DOM structure, CSS signals, and theme configuration), processes it, and leverages AI to identify issues across key business areas:

- Conversion (CRO)
- SEO
- User Experience (UX)
- Visual Design
- Trust & Credibility

The output is a strictly structured JSON response designed for direct consumption by frontend applications or other services.

---

## Architecture

### Backend (Node.js + Express)
- Scrapes and extracts Shopify store data  
- Transforms raw data into structured input  
- Integrates with OpenAI API for analysis  
- Returns validated JSON responses  

### Frontend (React + Vite)
- Accepts store URL input  
- Communicates with backend API  
- Displays structured AI recommendations  

### Infrastructure
- Dockerized services  
- Managed via Docker Compose  

---

## System Flow

1. User submits a Shopify store URL  
2. Backend scrapes:
   - SEO metadata (title, description, headings)
   - HTML structure (header, main, footer)
   - CSS signals (colors, button styles, fonts)
   - Theme configuration (if available)  
3. Data is normalized and structured  
4. Sent to OpenAI API with controlled prompt  
5. AI returns categorized recommendations (strict JSON)  
6. Backend validates and returns response  

---

## Tech Stack

### Backend
- Node.js
- Express
- OpenAI API
- Axios
- Cheerio

### Frontend
- React (Vite)
- Axios

### Infrastructure
- Docker
- Docker Compose

---

## Project Structure
/backend
/src
package.json

/frontend
/src
package.json

docker-compose.yml


---

## Environment Variables

Create a `.env` file in `/backend`:


OPENAI_API_KEY=your_openai_api_key


---

## Getting Started

### Prerequisites

- Docker
- Docker Compose

---

### 1. Clone the Repository

```bash
git clone https://github.com/Vitomirov/ShopifyMVP.git
cd ShopifyMVP
```
### 2. Configure Environment
cd backend
touch .env
Add your API key:
OPENAI_API_KEY=your_openai_api_key

### 3. Run the Application

From the root directory:
```bash
docker compose up --build
```
### 4. Access Services
Frontend: http://localhost:5173

Backend: http://localhost:3000

### 5. Development Notes
- Backend runs with nodemon for live reload
- Frontend uses Vite dev server
- Docker volumes enable real-time code updates
- Key Features:

AI-powered analysis with structured output
Real-time scraping and data extraction
LLM prompt engineering with enforced JSON schema
Error handling and fallback responses
Containerized development environment
- Limitations
Depends on publicly accessible Shopify data

AI output varies based on input quality
No authentication (MVP scope)

### 6. Summary

This project demonstrates:

Backend system design
Data ingestion pipelines
LLM integration in a real-world use case
API design with structured outputs
Docker-based development and deployment

---