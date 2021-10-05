import React, {Component} from 'react';
import {Link} from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import HomeAddressesService from "../services/HomeAddressesService";
import {Button, Col, Row} from "react-bootstrap";
import Select from "react-select";
import {Input} from "reactstrap";


class ListEmployeeComponent extends Component {

    LIMIT=30
    sortList=[
        { label: 'имени', value: '/fullName' },
        { label: 'округу', value: '/homeAddresses.region' },
        { label: 'району', value: '/homeAddresses.district' },
        { label: 'возрасту', value: '/age' },
    ]
    constructor(props) {
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

    convertToOptions(array){
        var new_array=[]
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
    scrollHandler =(e)=>{
        if(this.state.fetching) {
            if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 50) {
                if (this.state.emp.length < this.state.totalCount) {
                    this.state.fetching = false;
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
            return function () {
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

    getHourseAndMinute(emp){
        if(emp.operationMode!=null) {
            var dateStart = new Date(emp.operationMode?.startDay)
            var dateEnd = new Date(emp.operationMode?.endDay)
            var options = {
                timezone: 'UTC',
                hour: 'numeric',
                minute: 'numeric',
            };
            var startDay = dateStart.toLocaleString("ru", options)
            var endDay = dateEnd.toLocaleString("ru", options)
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
                                <Select placeholder='Сортировать'  height='30' options={this.sortList} isSearchable={false}
                                onChange=
                                    {
                                        (event) =>
                                        {
                                            this.setState({
                                                sortBy: event['value']
                                            },this.updateSelect)
                                        }
                                    }/>
                            </Col>
                            <Col md={3}>
                                <Select placeholder='Округ'  height='30' options={this.state.regions} isSearchable={true} isMulti
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
                                <Select placeholder='Район'  height='30' options={this.state.districts} isSearchable={true} isMulti
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
                                            { employee.homeAddresses?.district}
                                        </td>
                                        <td>
                                            { employee.homeAddresses?.region}
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