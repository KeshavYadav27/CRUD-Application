# schema.py
from decimal import Decimal

from pydantic import BaseModel, EmailStr


class OurBaseModel(BaseModel):
    class Config:
        # orm_mode was renamed to from_attributes
        # orm_mode=True
        from_attribute=True

# from_attributes = True indicates that Pydantic should use attribute-style access to data, making it compatible with ORMs that use attribute access.

class CreateEmployeeRequest(OurBaseModel):
    id: int
    f_name: str
    l_name: str
    email: str
    password: str
    # super_user: bool = False
    is_male: bool = True  # Corrected the default value syntax
    salary: Decimal
