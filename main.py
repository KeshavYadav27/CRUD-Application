from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

from database import SessionLocal
from models import Employee
from schema import CreateEmployeeRequest

# from models import Employee  # Assuming you have a models.py file with the Employee model

app = FastAPI()

db = SessionLocal() #All Queries Comes from Here



class OurBaseModel(BaseModel):
    class Config:
        # orm_mode was renamed to from_attributes
        # orm_mode=True
        from_attribute=True

# from_attributes = True indicates that Pydantic should use attribute-style access to data, making it compatible with ORMs that use attribute access.



@app.get('/',response_model=list[CreateEmployeeRequest], status_code = status.HTTP_200_OK)
def get_all_employee():
    getAllEmployee = db.query(Employee).all()
    return getAllEmployee

@app.post('/addemployee', response_model= CreateEmployeeRequest, status_code = status.HTTP_201_CREATED)
def add_Employee(emp: CreateEmployeeRequest):
    newEmployee = Employee(
        id = emp.id,
        f_name = emp.f_name,
        l_name = emp.l_name,
        email = emp.email,
        password = emp.password,
        is_male = emp.is_male,
        salary = emp.salary
    )

    find_employee = db.query(Employee).filter(Employee.id == emp.id).first()

    if find_employee != None:
        raise HTTPException(status_code = status.HTTP_406_NOT_ACCEPTABLE, detail = "Employee with this id already exist.")

    db.add(newEmployee)
    db.commit()

    return newEmployee
        
# we dont write models.Employee instead we right Employee because we included models in main.py






























# @app.get('/', status_code=200)
# def get_info():
#     return {"Message": "Server is running."}

# @app.get('/getemployeebyid/{id}', status_code=200)
# def get_employee_by_id(id: int):
#     return {"message": f"Your person ID is {id}"}

# @app.post('/addemployeeinfo', status_code=200)
# def add_employee_info(emp: CreateEmployeeRequest):  # Fix the model type here
#     return {
#         "id": emp.id,
#         "f_name": emp.f_name,
#         "l_name": emp.l_name,
#         "email": emp.email,
#         "password": emp.password,
#         "salary": emp.salary,
#     }
