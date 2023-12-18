from decimal import Decimal

from pydantic import BaseModel, EmailStr, Field


class OurBaseModel(BaseModel):
    class Config:
        # orm_mode was renamed to from_attributes
        # orm_mode=True
        from_attribute=True

# from_attributes = True indicates that Pydantic should use attribute-style access to data, making it compatible with ORMs that use attribute access.

class EmployeeRequest(OurBaseModel):
    name: str = Field(default=None)
    email: EmailStr = Field(default=None)
    password: str = Field(default=None)
    # super_user: bool = False
    is_male: bool = True  
    d_name: str = Field(default=None)
    salary: Decimal = Field(default=None)

class EmployeeLogin(OurBaseModel):
    email:EmailStr = Field(default=None)
    password: str = Field(default=None)
    class Config:
        the_schema = {
            "emp_demo":{
                "email":"keshavyadav2701@gmail.com",
                "password":"1234"  
            }
        }

class DepartmentRequest(OurBaseModel):
    id: int = Field(default=None)
    name: str = Field(default=None)
