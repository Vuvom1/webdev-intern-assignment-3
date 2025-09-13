
from sqlalchemy.orm import Session
from models.models import StudentScore


class StudentScoreRepository:
    @staticmethod
    def get_by_sbd(db: Session, sbd: str):
        return db.query(StudentScore).filter(StudentScore.sbd == sbd).first()

    @staticmethod
    def get_top_10_group_a(db: Session):
        # Group A: Math (toan), Physics (vat_li), Chemistry (hoa_hoc)
        return (
            db.query(StudentScore)
            .filter(StudentScore.toan.isnot(None), StudentScore.vat_li.isnot(None), StudentScore.hoa_hoc.isnot(None))
            .order_by((StudentScore.toan + StudentScore.vat_li + StudentScore.hoa_hoc).desc())
            .limit(10)
            .all()
        )

    @staticmethod
    def get_score_level_stats(db: Session):
        from sqlalchemy import func, case
        subjects = [
            'toan', 'ngu_van', 'ngoai_ngu', 'vat_li', 'hoa_hoc', 'sinh_hoc',
            'lich_su', 'dia_li', 'gdcd'
        ]
        stats = {}
        for subject in subjects:
            col = getattr(StudentScore, subject)
            level_1 = func.count(case((col >= 8, 1))).label('>=8')
            level_2 = func.count(case(((col < 8) & (col >= 6), 1))).label('6-8')
            level_3 = func.count(case(((col < 6) & (col >= 4), 1))).label('4-6')
            level_4 = func.count(case((col < 4, 1))).label('<4')
            result = db.query(level_1, level_2, level_3, level_4).one()
            stats[subject] = {
                '>=8': result[0],
                '6-8': result[1],
                '4-6': result[2],
                '<4': result[3]
            }
        return stats
