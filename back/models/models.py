from sqlalchemy import Column, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class StudentScore(Base):
    __tablename__ = "student_scores"
    sbd = Column(String, primary_key=True, index=True)
    toan = Column(Float, nullable=True)
    ngu_van = Column(Float, nullable=True)
    ngoai_ngu = Column(Float, nullable=True)
    vat_li = Column(Float, nullable=True)
    hoa_hoc = Column(Float, nullable=True)
    sinh_hoc = Column(Float, nullable=True)
    lich_su = Column(Float, nullable=True)
    dia_li = Column(Float, nullable=True)
    gdcd = Column(Float, nullable=True)
    ma_ngoai_ngu = Column(String, nullable=True)
