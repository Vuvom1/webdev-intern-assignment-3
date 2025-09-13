import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.models import Base

SQLALCHEMY_DATABASE_URL = os.environ.get("SQLALCHEMY_DATABASE_URL", "postgresql://postgres:password@localhost:5432/postgres")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)
