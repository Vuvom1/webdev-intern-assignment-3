
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from services.student_score_service import StudentScoreService
from database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/score/{sbd}")
async def get_score_by_sbd(sbd: str, db: Session = Depends(get_db)):
    result = StudentScoreService.get_score_by_sbd(db, sbd)
    if not result:
        raise HTTPException(status_code=404, detail="Student not found")
    return result

@router.get("/report/score-levels")
async def get_score_level_report(db: Session = Depends(get_db)):
    """
    Returns statistics of the number of students in 4 score levels by subject:
    - =8 points
    - 8 > and =6 points
    - 6 > and =4 points
    - <4 points
    """
    return StudentScoreService.get_score_level_stats(db)


@router.get("/top10/group-a")
async def get_top_10_group_a(db: Session = Depends(get_db)):
    return StudentScoreService.get_top_10_group_a(db)
