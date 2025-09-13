
from fastapi import FastAPI
from database import SessionLocal
from routers.student_score_router import router as student_score_router



app = FastAPI(
	title="Student Scores API",
	description="API for importing and querying student exam scores.",
	version="1.0.0",
	docs_url="/docs",
	redoc_url="/redoc"
)
app.include_router(student_score_router, prefix="/api")

def get_db():
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()

@app.get("/")
async def root():
	return {"message": "Hello, FastAPI!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)