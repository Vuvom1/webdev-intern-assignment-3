
import os
from sqlalchemy.orm import Session
from utils.csv_importer import CSVImporter
from database import SessionLocal

def seed_from_csv(csv_path: str, db: Session):
    importer = CSVImporter(db)
    importer.import_csv_to_db(csv_path)

if __name__ == "__main__":
    csv_path = os.environ.get("CSV_PATH", "diem_thi_thpt_2024.csv")
    db = SessionLocal()
    try:
        seed_from_csv(csv_path, db)
        print(f"Seeded data from {csv_path} into database.")
    finally:
        db.close()
