# Student Score Dashboard

This is a full-stack web application for managing and visualizing student exam scores for the 2024 Vietnamese high school graduation exam (THPT 2024).

## Features

- **Score Search**: Search for student scores by exam registration number (SBD)
- **Dashboard**: Overview of exam statistics and top performers
- **Reports**: Visual analytics with charts showing score distributions by subject and level
- **Responsive Design**: Mobile-friendly interface with dark mode support

## Tech Stack

### Backend

- **Python** with **FastAPI** framework
- **PostgreSQL** database
- **SQLAlchemy** ORM
- **Alembic** for database migrations
- **Docker** for containerization

### Frontend

- **Next.js 15** with React 19
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Axios** for API communication

## Project Structure

```text
├── back/                 # Backend API
│   ├── models/          # Database models
│   ├── repositories/    # Data access layer
│   ├── services/        # Business logic
│   ├── routers/         # API endpoints
│   ├── utils/           # Utilities (CSV importer)
│   └── alembic/         # Database migrations
├── front/               # Frontend application
│   └── src/app/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Application pages
│       ├── constants/   # API URLs and constants
│       └── axios/       # HTTP client configuration
└── netlify.toml         # Deployment configuration
```

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL (or use Docker)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd back
```

2. Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Set up environment variables:

```bash
# Create .env file
cp .env.example .env
# Edit .env with your database configuration
```

5. Set up the database:

```bash
# Run migrations
alembic upgrade head

# Seed the database with CSV data
python seeder.py
```

6. Start the development server:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd front
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
# Create .env.local
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api" > .env.local
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

- `GET /api/score/{sbd}` - Get student scores by registration number
- `GET /api/report/score-levels` - Get score distribution statistics
- `GET /api/top10/group-a` - Get top 10 students in Group A subjects

## Deployment

### Production Backend

The backend is deployed on Render.com with PostgreSQL database.

### Production Frontend

The frontend is deployed on Netlify with automatic builds from the main branch.

Live Demo: [https://webdev-intern-assignment-3.netlify.app](https://webdev-intern-assignment-3.netlify.app)

## Data Source

The application uses real data from the 2024 Vietnamese high school graduation exam results (`diem_thi_thpt_2024.csv`).

## Development Notes

- The application uses Next.js with static export for optimal performance
- React Router is implemented with client-side hydration to avoid SSR issues
- Environment variables are properly configured for both development and production
- Database migrations are managed with Alembic
- API responses include CORS headers for cross-origin requests

## Repository

This repository was created for the Golden Owl Solutions Python developer position application.
