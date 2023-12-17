# schema.py
from decimal import Decimal

from pydantic import BaseModel, EmailStr, Field


class OurBaseModel(BaseModel):
    class Config:
        # orm_mode was renamed to from_attributes
        # orm_mode=True
        from_attribute=True

# from_attributes = True indicates that Pydantic should use attribute-style access to data, making it compatible with ORMs that use attribute access.

class EmployeeRequest(OurBaseModel):
    id: int 
    f_name: str
    l_name: str 
    email: EmailStr 
    password: str
    # super_user: bool = False
    is_male: bool = True  
    d_name: str
    salary: Decimal

class DepartmentRequest(OurBaseModel):
    id: int
    name: str
