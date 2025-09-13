
import csv
from sqlalchemy.orm import Session
from models.models import StudentScore

class CSVImporter:
    def __init__(self, db: Session):
        self.db = db

    def import_csv_to_db(self, csv_path: str):
        with open(csv_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                student = StudentScore(
                    sbd=row.get('sbd'),
                    toan=self.try_parse_float(row.get('toan')),
                    ngu_van=self.try_parse_float(row.get('ngu_van')),
                    ngoai_ngu=self.try_parse_float(row.get('ngoai_ngu')),
                    vat_li=self.try_parse_float(row.get('vat_li')),
                    hoa_hoc=self.try_parse_float(row.get('hoa_hoc')),
                    sinh_hoc=self.try_parse_float(row.get('sinh_hoc')),
                    lich_su=self.try_parse_float(row.get('lich_su')),
                    dia_li=self.try_parse_float(row.get('dia_li')),
                    gdcd=self.try_parse_float(row.get('gdcd')),
                    ma_ngoai_ngu=row.get('ma_ngoai_ngu')
                )
                self.db.merge(student)
            self.db.commit()

    @staticmethod
    def try_parse_float(value):
        try:
            return float(value) if value else None
        except ValueError:
            return None
