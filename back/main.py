from fastapi import FastAPI
from database import SessionLocal, engine
from sqlalchemy.exc import OperationalError
from sqlalchemy import text
from routers.student_score_router import router as student_score_router
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(
	title="Student Scores API",
	description="API for importing and querying student exam scores.",
	version="1.0.0",
	docs_url="/docs",
	redoc_url="/redoc"
)
app.include_router(student_score_router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()

# Check DB connection on startup
@app.on_event("startup")
async def check_db_connection():
	try:
		with engine.connect() as conn:
			db_name = conn.execute(text("SELECT current_database()")).scalar()
			conn.execute(text("SELECT 1"))
		print(f"Database connection successful. Connected to DB: {db_name}")
	except OperationalError as e:
		print(f"Database connection failed: {e}")
		import sys
		sys.exit(1)

@app.get("/")
async def root():
	return {"message": "Hello, FastAPI!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)