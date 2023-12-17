from sqlalchemy import Boolean, Column, Integer, Numeric, String

from database import Base, engine


def create_tables():
    Base.metadata.create_all(engine)

# employee table in database
class Employee(Base):
    __tablename__= "Employee"
    id = Column(Integer,primary_key= True, index=True)
    f_name= Column(String(100),nullable=False)
    l_name= Column(String(100),nullable=False)
    email = Column(String(250),unique=True,nullable=False)
    password = Column(String(100),nullable=False)
    super_user = Column(Boolean,default=False)
    is_male = Column(Boolean,default=True)
    salary = Column(Numeric(10,2))