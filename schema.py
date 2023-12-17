# schema.py
from decimal import Decimal

from pydantic import BaseModel, EmailStr


class CreateEmployeeRequest(BaseModel):
    id: int
    f_name: str
    l_name: str
    email: str
    password: str
    # super_user: bool = False
    is_male: bool = True  # Corrected the default value syntax
    salary: Decimal
