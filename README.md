# Nexaur Ai 

**Nexaur Ai** is Bangladesh's first tech platform for **Shariah-compliant fractional real estate investment**, driven by artificial intelligence.

## The Problem

Real estate is a cornerstone of wealth-building, but for the average person in Bangladesh, it remains largely inaccessible. The primary barriers are:
* **High Capital:** Prohibitive costs price out small to mid-sized investors.
* **Opaque Markets:** Lack of transparent data and reliance on insider knowledge creates trust issues.
* **Lack of Halal Options:** Observant investors have extremely limited options to participate in the real estate market without compromising their faith (i.e., avoiding interest-based financing).

## Our Solution

Nexaur Ai democratizes real estate investing by combining an **AI-driven fund manager** with **blockchain-based fractional ownership**.

Our platform scouts thousands of property listings to identify and vet high-potential, undervalued assets that are fully Shariah-compliant. These properties are then "tokenized," allowing anyone—from young professionals to expatriate Bangladeshis—to buy and own small, tradable fractions of high-value real estate.

## Key Features

* **AI-Driven Analysis:** An AI engine analyzes property data (location trends, rental yields, developer reputation) to assign a "Halal Investment Score," acting as an AI Robo-advisor for real estate.
* **Fractional Ownership (Tokenization):** We convert physical property ownership into digital tokens on a blockchain, allowing for accessible, small-scale investment.
* **Blockchain Transparency:** All ownership records and transactions are recorded immutably on a ledger, bringing radical transparency to an opaque market.
* **Automated Profit Distribution:** Smart contracts automatically and transparently distribute rental income and future sale profits to all token holders.
* **Ethical & Halal:** The entire model is built on profit-sharing, completely eliminating interest-based (riba) financing to ensure 100% Shariah compliance.

## Tech Stack

**Frontend:**
- React 18
- Vite
- Axios
- Lucide React (icons)

**Backend:**
- FastAPI
- Transformers (Hugging Face)
- PyTorch
- Finance-Llama-8B model

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- CUDA-compatible GPU (optional, for faster inference)

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend

1. Navigate to the backend directory and activate your virtual environment
2. Run the FastAPI server:
```bash
python main.py
```

The backend will start on `http://localhost:8000`

**Note:** The first run will download the Finance-Llama-8B model (~16GB), which may take some time.

### Start the Frontend

1. In a new terminal, navigate to the frontend directory
2. Start the Vite dev server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Usage

1. Open your browser and go to `http://localhost:5173`
2. Wait for the model to load (check the status indicator in the header)
3. Start chatting with the AI advisor about:
   - Real estate investment strategies
   - Market analysis
   - Financial planning
   - Portfolio diversification
   - And more!

## API Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check and model status
- `POST /chat` - Chat with the AI model

## Notes

- The model requires significant RAM (8GB+ recommended)
- First response may be slower as the model initializes
- For production use, consider using a more powerful server with GPU support
- Always consult licensed professionals for actual financial decisions

## Troubleshooting

**Backend issues:**
- Ensure all Python dependencies are installed
- Check if port 8000 is available
- For memory issues, consider using a smaller model or adding more RAM

**Frontend issues:**
- Ensure Node.js is installed correctly
- Check if port 5173 is available
- Verify the backend is running before starting the frontend

## License

MIT License
