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
    is_male = Column(Boolean, default= True)
    super_user = Column(Boolean,default=False)
    d_name = Column(String)
    salary = Column(Numeric(10,2))

class Department(Base):
    __tablename__="Department"
    id = Column(Integer,primary_key= True, index=True)
    name = Column(String,unique=True,nullable=False)


# add python code in which employee can select only those departments which are in the database