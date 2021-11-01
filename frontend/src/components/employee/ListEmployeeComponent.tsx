import React, {Component} from 'react';
import {Link, RouteComponentProps} from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";
import HomeAddressesService from "../../services/HomeAddressesService";
import {Button, Col, Row} from "react-bootstrap";
import Select from "react-select";
import {Input} from "reactstrap";
import {Errors} from "../../interface/ErrorsInterface";
import {Employee} from "../../interface/EmployeeInterface";

interface IProps extends RouteComponentProps{
}

interface IState {
    employees:Array<Employee>;
    emp:Array<Employee>;
    currentPage:number;
    fetching:boolean;
    totalCount:number;
    value:string;
    sortBy:string;
    districts:Array<any>;
    regions:Array<any>;
    selectRegions:Array<any>;
    selectDistricts:Array<any>;
    open:boolean;
}

class ListEmployeeComponent extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);

        this.state={
            employees:[],
            emp:[],
            currentPage:0,
            fetching:true,
            totalCount:0,
            value:'',
            sortBy:'',
            districts:[],
            regions:[],
            selectRegions:[],
            selectDistricts:[],
            open:false
        }
        this.getEmployee=this.getEmployee.bind(this);
        this.addEmployee=this.addEmployee.bind(this);
    }

    LIMIT=30
    sortList=[
        { label: 'имени', value: '/fullName' },
        { label: 'округу', value: '/homeAddresses.district.region.region_name' },
        { label: 'району', value: '/homeAddresses.district.district_name' },
        { label: 'возрасту', value: '/age' },
    ]

    convertToOptions(array: any[]){
        let new_array: { label: string; value: string; }[]=[]
        array.map(obj=>{
            new_array.push({'label':`${obj}`,'value':`${obj}`})
        })

        return new_array;
    }

    updateEmployees(){
        EmployeeService.getFilterSortEmployees(this.state.currentPage,this.LIMIT,this.state.sortBy,this.state.selectDistricts,this.state.selectRegions)
            .then(response=>{

                    this.setState({
                        emp:this.state.emp.concat(response.data),
                        currentPage:this.state.currentPage+1,
                        totalCount:response.headers['x-total-count'],
                        fetching:true
                    })
                }
            )
    }
    scrollHandler =(e:any)=>{
        if(this.state.fetching) {
            if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 50) {
                if (this.state.emp.length < this.state.totalCount) {
                    this.setState({fetching:false})
                    this.updateEmployees()

                }
            }
        }
    }


    componentDidMount() {
        HomeAddressesService.getAllRegion().then((res)=>{
            this.setState({
                regions:this.convertToOptions(res.data)
            })
        })
        HomeAddressesService.getAllDistricts().then((res)=>{
            this.setState({
                districts:this.convertToOptions(res.data)
            })
        })

        if(this.state.fetching) {
            document.addEventListener('scroll', this.scrollHandler)
            EmployeeService.getFilterSortEmployees(this.state.currentPage,this.LIMIT,this.state.sortBy,this.state.selectDistricts,this.state.selectRegions)
                .then(response=>{
                        this.setState({
                            emp:response.data,
                            totalCount:response.headers['x-total-count'],
                            currentPage:1
                        },)

                    }
                )
            return () => {
                document.removeEventListener('scroll', this.scrollHandler)
            }
        }
    }
    getEmployee(){
        this.props.history.push('/employee/:id')
    }
    addEmployee(){
        this.props.history.push('/add/employee')
    }

    getHourseAndMinute(emp:Employee){
        const options = new Intl.DateTimeFormat('ru',{
            hour: 'numeric',
            minute: 'numeric',
        });
        if(emp.operationMode!=null && emp.operationMode.startDay!=undefined && emp.operationMode.endDay!=undefined ) {
            let dateStart = new Date(emp.operationMode?.startDay)
            let dateEnd = new Date(emp.operationMode?.endDay)
            let startDay = options.format(dateStart)
            let endDay = options.format(dateEnd)
            return startDay + '-' + endDay;
        }else return 'График не установлен'
    }
    filtredEmployees() {
        var filterArray=this.state.emp.filter(employee => {
            return employee.fullName.toLowerCase().includes(this.state.value.toLowerCase());
        })
        return filterArray
    }
    updateSelect = () => {
        EmployeeService.getFilterSortEmployees(0,this.LIMIT,this.state.sortBy,
            this.state.selectDistricts.toLocaleString(),this.state.selectRegions.toLocaleString())
            .then((res)=>
            {
                this.setState(
                    {
                        emp: res.data,
                        currentPage: 1
                    },)
            })
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Список сотрудников</h2>
                <div className='row'>
                    <div >
                        <Row>
                            <Col  md={3} >
                                <Input type='text'
                                       placeholder='Поиск по ФИО'
                                       className='seacrh_input'
                                       height='30'
                                       onChange={(event)=>this.setState({value:event.target.value})}
                                />
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col md={3}>
                                <Select placeholder='Сортировать'   options={this.sortList} isSearchable={false}
                                onChange=
                                    {
                                        (event) =>
                                        {
                                            if(event!=null) {
                                                this.setState({
                                                    sortBy: event['value']
                                                }, this.updateSelect)
                                            }
                                        }
                                    }/>
                            </Col>
                            <Col md={3}>
                                <Select placeholder='Округ'   options={this.state.regions} isSearchable={true} isMulti
                                    onChange={
                                            (event)=>
                                            {
                                                this.setState({
                                                    selectRegions: event.map(e => e.value)
                                                },this.updateSelect)
                                            }
                                        }
                                />
                            </Col>
                            <Col md={3}>
                                <Select placeholder='Район'   options={this.state.districts} isSearchable={true} isMulti
                                        onChange={
                                            (event)=>
                                            {
                                                this.setState({
                                                    selectDistricts: event.map(e => e.value)
                                                },this.updateSelect)
                                            }
                                        }
                                />
                            </Col>
                            <Col>
                                <Button variant="outline-dark"   onClick={this.addEmployee.bind(this)}>Добавить сотрудника</Button>
                            </Col>
                        </Row>
                        <br/>
                    </div>
                    <table className='table'>
                        <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Возраст</th>
                            <th>Адрес</th>
                            <th>Район</th>
                            <th>Округ</th>
                            <th>График</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.filtredEmployees().length > 0 ? (
                                this.filtredEmployees().map(employee => (
                                    <tr key={employee.emp_id}>
                                        <td><Link to={`/employee/id=${employee.emp_id}` }>{employee.fullName} </Link></td>
                                        <td>{employee.age}</td>
                                        <td>
                                            {employee.homeAddresses?.address}
                                        </td>
                                        <td>
                                            { employee.homeAddresses?.district?.district_name}
                                        </td>
                                        <td>
                                            { employee.homeAddresses?.district?.region?.region_name}
                                        </td>
                                        <td>
                                            {this.getHourseAndMinute(employee)}
                                        </td>
                                    </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2}>Список сотрудников пуст</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;