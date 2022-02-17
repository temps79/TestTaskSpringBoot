import React, {Component} from 'react';
import {Link, RouteComponentProps} from "react-router-dom";
import HomeAddressesService from "../../services/HomeAddressesService";
import {Button, Col, Row} from "react-bootstrap";
import Select from "react-select";
import {Input} from "reactstrap";
import {Employee} from "../../interface/EmployeeInterface";
import {inject, observer} from "mobx-react";
import applicationStore from "../../stores/ApplicationStore";

import {AppContext} from "../../AppContext";



interface IProps extends RouteComponentProps{
}

interface IState {
    value:string;
    sortBy:string;
    districts:Array<any>;
    regions:Array<any>;
    selectRegions:Array<any>;
    selectDistricts:Array<any>;
}



@inject('applicationStore')
@observer
class ListEmployeeComponent extends Component<IProps, IState> {
    static contextType = AppContext;
    constructor(props:IProps) {
        super(props);

        this.state={
            value:'',
            sortBy:'',
            districts:[],
            regions:[],
            selectRegions:[],
            selectDistricts:[],
        }
        this.getEmployee=this.getEmployee.bind(this);
        this.addEmployee=this.addEmployee.bind(this);
    }

    sortList=[
        { label: 'имени', value: '/fullName' },
        { label: 'округу', value: '/homeAddresses.territory.territory.name' },
        { label: 'району', value: '/homeAddresses.territory.name' },
        { label: 'возрасту', value: '/age' },
    ]


    scrollHandler =(e:any)=>{
        if(window.location.pathname!='/'){
            document.removeEventListener('scroll', this.scrollHandler)
        }
        if(this.context.applicationStore.fetching) {
            if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 60) {
                if (this.context.applicationStore.employees.length < this.context.applicationStore.totalCount) {
                   this.context.applicationStore.setFetching(false)
                    this.context.applicationStore.updateEmployees(this.state.sortBy,
                        this.state.selectDistricts,this.state.selectRegions)
                }else{
                    document.removeEventListener('scroll', this.scrollHandler)
                }
            }
        }
    }

    convertToOptions(array: any[]){
        let new_array: { label: string; value: string; }[]=[]
        array.map(obj=>{
            new_array.push({'label':`${obj}`,'value':`${obj}`})
        })
        return new_array;
    }
    componentDidMount() {
        this.context.applicationStore.initEmployees()
        HomeAddressesService.getAllDistricts().then((res)=>{
            this.setState({districts:this.convertToOptions(res.data)})
        })
        HomeAddressesService.getAllRegion().then((res)=>{
            this.setState({regions:this.convertToOptions(res.data)})
        })
        if(this.context.applicationStore.fetching) {
            document.addEventListener('scroll', this.scrollHandler)
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
        let filterArray=this.context.applicationStore.employees.filter((employee: { fullName: string; }) => {
            return employee.fullName.toLowerCase().includes(this.state.value.toLowerCase());
        })
        return filterArray
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
                                                },()=>{
                                                    this.context.applicationStore.updateSelect(this.state.sortBy,this.state.selectDistricts,this.state.selectRegions)
                                                })
                                            }
                                        }
                                    }
                                />
                            </Col>
                            <Col md={3}>
                                <Select
                                    placeholder='Округ'
                                    options={this.state.regions}
                                    isSearchable={true} isMulti
                                    onChange={
                                            (event)=>
                                            {
                                                this.setState({
                                                    selectRegions: event.map(e => (
                                                        e.value
                                                    ))
                                                },()=>{
                                                    this.context.applicationStore.updateSelect(this.state.sortBy,this.state.selectDistricts,this.state.selectRegions)
                                                })
                                            }
                                        }

                                />
                            </Col>
                            <Col md={3}>
                                <Select placeholder='Район'
                                        options={this.state.districts}
                                        isSearchable={true}
                                        isMulti
                                        onChange={
                                            (event)=>
                                            {
                                                this.setState({
                                                    selectDistricts: event.map(e => e.value)
                                                },()=> {
                                                    this.context.applicationStore.updateSelect(this.state.sortBy, this.state.selectDistricts, this.state.selectRegions)
                                                })
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
                                 this.filtredEmployees().map((employee: Employee) => (
                                    <tr key={employee.emp_id}>
                                        <td><Link to={`/employee/id=${employee.emp_id}` } >{employee.fullName} </Link></td>
                                        <td>{employee.age}</td>
                                        <td>
                                            {employee.homeAddresses?.address}
                                        </td>
                                        <td>
                                            { employee.homeAddresses?.territory?.name}
                                        </td>
                                        <td>
                                            { employee.homeAddresses?.territory?.territory?.name}
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