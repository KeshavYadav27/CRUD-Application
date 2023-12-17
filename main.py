from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

from database import SessionLocal
from models import Employee
from schema import CreateEmployeeRequest

# from models import Employee  # Assuming you have a models.py file with the Employee model

app = FastAPI()

db = SessionLocal() #All Queries Comes from Here

@app.get('/',response_model=list[CreateEmployeeRequest], status_code = status.HTTP_200_OK)
def get_all_employee():
    getAllEmployee = db.query(Employee).all()
    return getAllEmployee

@app.get('/getemployeebyid/{id}', status_code=200)
def get_employee_by_id(id: int):
    return {"message": f"Your person ID is {id}"}


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



@app.put('/update_employee/{e_id}', response_model=CreateEmployeeRequest,status_code=status.HTTP_202_ACCEPTED)
def update_person(e_id: int, emp: CreateEmployeeRequest):
    find_emp = db.query(Employee).filter(Employee.id == e_id).first()
    # filter(emp.id == e_id) in place of emp.id we have to write Employee.id
    # find_emp.id = emp.id
    if find_emp is not None:
        find_emp.f_name = emp.f_name
        find_emp.l_name = emp.l_name
        find_emp.email = emp.email
        find_emp.password = emp.password
        find_emp.is_male = emp.is_male
        find_emp.salary = emp.salary
        db.commit()
        db.refresh(find_emp)
        return find_emp
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Employee with this id not found")

@app.delete("/deleteemployee/{e_id}", response_model = CreateEmployeeRequest, status_code=status.HTTP_200_OK)
def deleteEmployee(e_id:int):
    find_emp = db.query(Employee).filter(Employee.id == e_id).first()

    if  find_emp is not None:
        db.delete(find_emp)

        db.commit()
        return HTTPException(status_code=status.HTTP_200_OK,detail="Employee is deleted with id={e_id}")
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Employee with this id is either deleted or not found")



#in def and app.operation(any:- post,get,put) we have to use same variable which we have used in jinja format




























# @app.get('/', status_code=200)
# def get_info():
#     return {"Message": "Server is running."}

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
