# FastAPI Student Scores Project

This project is a FastAPI application for importing and serving student exam scores from a CSV file into a PostgreSQL database.

## Prerequisites
- Python 3.8+
- PostgreSQL
- (Recommended) Virtual environment tool: `venv` or `virtualenv`

## Setup Instructions

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd webdev-intern-assignment-3/back
```

### 2. Create and activate a virtual environment
```sh
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies
```sh
pip install -r requirements.txt
```

### 4. Configure the database
- Create a PostgreSQL database (default: `postgres`)
- Set the database URL in a `.env` file at the project root:

```
SQLALCHEMY_DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<dbname>
```

### 5. Run database migrations
```sh
alembic upgrade head
```

### 6. Seed the database with CSV data
- Place your CSV file (default: `diem_thi_thpt_2024.csv`) in the project root.
- Run the seeder script:

```sh
python seeder.py
```
- Or specify a custom CSV file:
```sh
CSV_PATH=your_file.csv python seeder.py
```

### 7. Start the FastAPI server
```sh
uvicorn main:app --reload
```

- The API will be available at: http://127.0.0.1:8000
- Swagger docs: http://127.0.0.1:8000/docs

## Project Structure
- `main.py` - FastAPI app
- `models/` - SQLAlchemy models
- `utils/csv_importer.py` - CSV import logic
- `database.py` - Database connection setup
- `alembic/` - Database migrations
- `seeder.py` - Script to import CSV data

## Troubleshooting
- Ensure PostgreSQL is running and accessible.
- Check your `.env` file for correct database credentials.
- If you get migration errors about existing tables, you may need to drop the table or reset the database.

---

Feel free to open an issue or ask for help if you get stuck!
