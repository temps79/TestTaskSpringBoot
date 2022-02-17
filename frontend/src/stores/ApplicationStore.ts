import {action, makeAutoObservable, observable, runInAction} from "mobx";
import {Employee} from "../interface/EmployeeInterface";
import EmployeeService from "../services/EmployeeService";

export class ApplicationStore {
    @observable
    employees:Employee[]=[];
    @observable
    currentPage=0;
    @observable
    totalCount=0;
    @observable
    LIMIT=30;
    @observable
    fetching:boolean=true

    constructor() {
        makeAutoObservable(this);
    }
    @action
    initEmployees(){
        EmployeeService.getFilterSortEmployees(0,this.LIMIT,'',[],[])
            .then(response=>{
                    this.employees=response.data;
                    this.totalCount =response.headers['x-total-count'];
                    this.currentPage=1;
                }
            )
    }
    @action
    updateEmployees(sortBy:string='', districts:any[]=[], regions:any[]=[]){
        EmployeeService.getFilterSortEmployees(this.currentPage,this.LIMIT,sortBy,districts,regions)
            .then(response=>{
                runInAction(()=>{
                    this.employees=this.employees.concat(response.data);
                    this.currentPage=this.currentPage+1;
                    this.totalCount=response.headers['x-total-count'];
                    this.fetching=true
                })
                return true
                }
            )
    }
    @action
    updateSelect(sortBy:string,selectDistricts:any[],selectRegions:any[]){
        EmployeeService.getFilterSortEmployees(0,this.LIMIT,sortBy,
            selectDistricts.toLocaleString(),selectRegions.toLocaleString())
            .then((res)=>
            {
                runInAction(()=>{
                    this.employees=res.data
                    this.currentPage=1
                })
            })

    }
    @action.bound
    getEmployeeById(id:number){
        return this.employees.find(emp=>emp.emp_id==id)
    }
    @action.bound
    setFetching(fetching:boolean){
        this.fetching=fetching;
    }

}

const applicationStore = new ApplicationStore();
export default applicationStore;
