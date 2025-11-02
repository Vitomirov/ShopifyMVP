# ShopifyMVP - Local Docker Setup

## 1. Clone the repository
git clone https://github.com/Vitomirov/ShopifyMVP.git
cd ShopifyMVP

## 2. Create backend .env file
cd backend
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
echo "PORT=3000" >> .env
cd ..

## 3. Start the project with Docker
docker compose up --build

# The backend will run on http://localhost:3000
# The frontend will run on http://localhost:5173

# Nodemon is enabled in the backend container for live reload.
# Any code changes in your local files will automatically trigger rebuilds.
