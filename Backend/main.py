from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from auth.jwt_bearer import jwtBearer
from auth.jwt_handler import signJWT
from database import SessionLocal
from models import Department, Employee
from schema import DepartmentRequest, EmployeeLogin, EmployeeRequest

# from models import Employee  # Assuming you have a models.py file with the Employee model

app = FastAPI()

db = SessionLocal() #All Queries Comes from Here 
 
app.add_middleware(
    CORSMiddleware,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    allow_origins=["http://localhost:3000"])

@app.get('/', status_code=status.HTTP_200_OK)
def get_employees():
    return{
        "message":"Project"
    } 

@app.get('/getemployees',response_model=EmployeeRequest, status_code=status.HTTP_200_OK)
def get_employees(emp:EmployeeRequest):
    getEmployee = db.query(Employee).all()
    return getEmployee    
        

@app.get('/getdepartment',response_model=DepartmentRequest,status_code=status.HTTP_200_OK)
def get_department(dept:DepartmentRequest):
    getDepartment = db.query(Department).all()
    return getDepartment



@app.post('/signup',status_code = status.HTTP_201_CREATED)
def signup(emp: EmployeeRequest):
    newEmployee = Employee(
        name = emp.name,
        email = emp.email,
        password = emp.password,
        is_male = emp.is_male,
        d_name = emp.d_name,
        salary = emp.salary
    )

    find_employee = db.query(Employee).filter(Employee.email == emp.email).first()

    if find_employee != None:
        raise HTTPException(status_code = status.HTTP_406_NOT_ACCEPTABLE, detail = "Employee with this id already exist.")

    db.add(newEmployee)
    db.commit()

    return {"message" : "Signup Successfull"}# we can write newEmployee.email or emp.email because newEmployee has emp values
        
# we dont write models.Employee instead we right Employee because we included models in main.py
# dependencies=[Depends(jwtBearer())], we can add this so that only person with autorized token can use api

@app.post('/addDepartment',status_code=status.HTTP_200_OK)
def add_department(dept:DepartmentRequest):
    new_dept = Department(
        name = dept.name
    )
    db.add(new_dept)
    db.commit()
    return {"message" : "Department added Successfully"}

def check_employee(emp:EmployeeLogin):
    checkemp = db.query(Employee).filter(Employee.email == emp.email).first()
    return checkemp is not None

@app.post('/login')
def login(emp:EmployeeLogin):
    employee_data = db.query(Employee).all()
    department_data = db.query(Department).all()
    super_employee = db.query(Employee).filter(Employee.email == emp.email).first()
    if(check_employee(emp) ):
        if(super_employee.super_user):
            return {
            "access_token": signJWT(emp.email),
            "employee_data": employee_data,
            "department_data": department_data
            }
        else:
            return {"access_token":signJWT(emp.email)}    
    else:
        return {"message" : "Login failed"}



@app.put('/updateemployee/{e_id}',status_code=status.HTTP_202_ACCEPTED)
def update_employee(e_id: int, emp: EmployeeRequest):
    find_emp = db.query(Employee).filter(Employee.id == e_id).first()
    # filter(emp.id == e_id) in place of emp.id we have to write Employee.id
    # find_emp.id = emp.id
    if find_emp is not None:
        find_emp.name = emp.name
        find_emp.email = emp.email
        find_emp.password = emp.password
        find_emp.is_male = emp.is_male
        find_emp.d_name = emp.d_name
        find_emp.salary = emp.salary
        db.commit()
        db.refresh(find_emp)
        return {
            "message":"Employee Updated Successfully"
        }
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Employee with this id not found")

@app.put('/updatedepartment/{d_id}',status_code=status.HTTP_202_ACCEPTED)
def update_department(d_id:int , dept:DepartmentRequest):
    find_dept = db.query(Department).filter(Department.id == d_id).first()
    if find_dept is not None:
        find_dept.name = dept.name
        db.commit()
        db.refresh(find_dept)
        return{
            "message":"Department Updated Successfully"
        }
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Department with this id not found")


@app.delete('/deleteemployee/{e_id}', status_code=status.HTTP_200_OK)
def deleteEmployee(e_id:int):
    find_emp = db.query(Employee).filter(Employee.id == e_id).first()

    if find_emp is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Employee with this id is either deleted or not found")

    db.delete(find_emp)
    db.commit()
    
    return {
        "message":"Employee Deleted"
    }
    

@app.delete('/deletedepartment/{d_id}',status_code=status.HTTP_200_OK)
def delete_dept(d_id:int):
    find_dept = db.query(Department).filter(Department.id  == d_id).first()
    db.delete(find_dept)
    db.commit()

    return {
        "message":"Department Deleted"
    }


#in def and app.operation(any:- post,get,put) we have to use same variable which we have used in jinja format





# @app.post('/login')
# def login(emp:EmployeeLogin):
#     employee = db.query(Employee).all()
#     department = db.query(Department).all()
#     if(check_employee(emp)):
#         return signJWT(emp.email)
#     else:
#         return {"message" : "Login failed"}
