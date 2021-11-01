import axios from 'axios'
import {Employee} from "../interface/EmployeeInterface";


const EMPLOYEE_API_BASE_URL="http://localhost:8080/api/v1/employees"
const EMPLOYEE_API_GET_URL="http://localhost:8080/api/v1/employee/id="
const EMPLOYEE_API_REMOVE_URL="http://localhost:8080/api/v1/remove/id="
const EMPLOYEE_API_UPDATE_URL="http://localhost:8080/api/v1/edit/employee/id="
const STAT_API_GET_URL="http://localhost:8080/api/v1/stat"
const EMPLOYEE_API_POST_URL="http://localhost:8080/api/v1/add/employee"

class EmployeeService  {
    getFilterSortEmployees(currentPage: number, count_element: number, sortBy: any, districts: any, regions: any){
        return axios.get(EMPLOYEE_API_BASE_URL+`/${(currentPage)}/${count_element}${sortBy}/district=${districts}/region=${regions}`,{
            method:'GET',
            headers:{
                "Authorization": sessionStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
        });
    }
    getEmployee(employeeId: string){
        return axios.get(EMPLOYEE_API_GET_URL+employeeId,{
            method:'GET',
            headers:{
                "Authorization": sessionStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
        });
    }
    addEmployee(employee:Employee){
        return axios.post(EMPLOYEE_API_POST_URL, employee,{
            method:'GET',
            headers:{
                "Authorization": sessionStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
        });
    }

    updateEmployee(employeeId: number | undefined, employee: Employee){
        return axios.put(EMPLOYEE_API_UPDATE_URL+employeeId,employee,{
            method:'PUT',
            headers:{
                "Authorization": sessionStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
        });
    }
    getStat(){
        return axios.get(STAT_API_GET_URL,{
            method:'GET',
            headers:{
                "Authorization": sessionStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
        });
    }
    removeEmployee(employeeId: string){
        return axios.get(EMPLOYEE_API_REMOVE_URL+employeeId,{
            method:'GET',
            headers:{
                "Authorization": sessionStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
        });
    }
}

export default new EmployeeService();