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

@app.get('/getemployee/{e_id}',response_model=EmployeeRequest, status_code=status.HTTP_200_OK)
def get_employee(e_id: int):
    getEmployee = db.query(Employee).filter(Employee.id == e_id).first()
    if getEmployee is not None:
        return getEmployee
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Employee with this id not found")    
        


@app.post('/signup',status_code = status.HTTP_201_CREATED)
def signup(emp: EmployeeRequest):
    newEmployee = Employee(
        id = emp.id,
        f_name = emp.f_name,
        l_name = emp.l_name,
        email = emp.email,
        password = emp.password,
        is_male = emp.is_male,
        d_name = emp.d_name,
        salary = emp.salary
    )

    find_employee = db.query(Employee).filter(Employee.id == emp.id).first()

    if find_employee != None:
        raise HTTPException(status_code = status.HTTP_406_NOT_ACCEPTABLE, detail = "Employee with this id already exist.")

    db.add(newEmployee)
    db.commit()

    return signJWT(newEmployee.email)# we can write newEmployee.email or emp.email because newEmployee has emp values
        
# we dont write models.Employee instead we right Employee because we included models in main.py


def check_employee(emp:EmployeeLogin):
    checkemp = db.query(Employee).filter(Employee.email == emp.email).first()
    return checkemp is not None

@app.post('/login')
def login(emp:EmployeeLogin):
    
    if(check_employee(emp)):
        return signJWT(emp.email)
    else:
        return {
            "error":"Invalid Login Details"
        }



@app.put('/updateemployee/{e_id}', response_model=EmployeeRequest,status_code=status.HTTP_202_ACCEPTED)
def update_employee(e_id: int, emp: EmployeeRequest):
    find_emp = db.query(Employee).filter(Employee.id == e_id).first()
    # filter(emp.id == e_id) in place of emp.id we have to write Employee.id
    # find_emp.id = emp.id
    if find_emp is not None:
        find_emp.f_name = emp.f_name
        find_emp.l_name = emp.l_name
        find_emp.email = emp.email
        find_emp.password = emp.password
        find_emp.is_male = emp.is_male
        find_emp.d_name = emp.d_name
        find_emp.salary = emp.salary
        db.commit()
        db.refresh(find_emp)
        return find_emp
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Employee with this id not found")



@app.delete('/deleteemployee/{e_id}', response_model = EmployeeRequest, status_code=status.HTTP_200_OK)
def deleteEmployee(e_id:int):
    find_emp = db.query(Employee).filter(Employee.id == e_id).first()

    if find_emp is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Employee with this id is either deleted or not found")

    db.delete(find_emp)
    db.commit()
    
    return find_emp
    
@app.post('/add_department', dependencies=[Depends(jwtBearer())], status_code = status.HTTP_201_CREATED)
def add_dept(dept:DepartmentRequest):
    newDept = Department(
        id = dept.id,
        name = dept.name
    )
    db.add(newDept)
    db.commit()

    return {
        "info": "Department Added"
    }



#in def and app.operation(any:- post,get,put) we have to use same variable which we have used in jinja format

