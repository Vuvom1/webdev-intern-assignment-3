from sqlalchemy.orm import Session
from repositories.student_score_repository import StudentScoreRepository

class StudentScoreService:
    @staticmethod
    def get_score_by_sbd(db: Session, sbd: str):
        student = StudentScoreRepository.get_by_sbd(db, sbd)
        if not student:
            return None
        return {
            "sbd": student.sbd,
            "toan": student.toan,
            "ngu_van": student.ngu_van,
            "ngoai_ngu": student.ngoai_ngu,
            "vat_li": student.vat_li,
            "hoa_hoc": student.hoa_hoc,
            "sinh_hoc": student.sinh_hoc,
            "lich_su": student.lich_su,
            "dia_li": student.dia_li,
            "gdcd": student.gdcd,
            "ma_ngoai_ngu": student.ma_ngoai_ngu
        }

    @staticmethod
    def get_top_10_group_a(db: Session):
        students = StudentScoreRepository.get_top_10_group_a(db)
        result = []
        for student in students:
            result.append({
                "sbd": student.sbd,
                "toan": student.toan,
                "vat_li": student.vat_li,
                "hoa_hoc": student.hoa_hoc,
                "total": (student.toan or 0) + (student.vat_li or 0) + (student.hoa_hoc or 0)
            })
        return result

    @staticmethod
    def get_score_level_stats(db: Session):
        return StudentScoreRepository.get_score_level_stats(db)
