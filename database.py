from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

engine = create_engine("postgresql://postgres:9013@localhost/DB")

Base = declarative_base()

SessionLocal=sessionmaker(bind = engine)
