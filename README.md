# ShopifyMVP Local Setup

# 1. Clone the repository
git clone git@github.com:Vitomirov/ShopifyMVP.git
cd ShopifyMVP

# 2. Backend Setup
cd backend
npm install

# 3. Create .env file
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
echo "PORT=5000" >> .env

# 4. Start backend server
node src/index.js
# Expected output: Server is on port 5000

# 5. Frontend Setup (open a new terminal tab/window)
cd frontend
npm install
npm run dev
