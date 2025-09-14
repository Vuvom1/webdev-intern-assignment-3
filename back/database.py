import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.models import Base

SQLALCHEMY_DATABASE_URL = os.environ.get("SQLALCHEMY_DATABASE_URL", "postgresql://user:18XHX4flKXt1x7hfu0Cmg7sK6KsFrVCr@dpg-d32nmrjipnbc73dc25g0-a.oregon-postgres.render.com/postgresdb_wn02")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)
