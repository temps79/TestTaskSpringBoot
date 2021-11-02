import React, {Component, CSSProperties} from 'react';
import EmployeeService from "../../services/EmployeeService";
import {Button, Col, Form, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import {Input} from "reactstrap";
import Select from 'react-select';
import {History, LocationState} from "history";
import {HomeAddress} from "../../interface/HomeAddressInterface";
import {Employee} from "../../interface/EmployeeInterface";
import {Errors} from "../../interface/ErrorsInterface";
import {OperationMode} from "../../interface/OperationModeInterface";
import {RouteComponentProps} from "react-router-dom";
import {withRouter} from "react-router";
import {RegionOptionInterface} from "../../interface/RegionOptionInterface";
import {GroupedOptionInterface} from "../../interface/GroupOptionInterface";
import {groupedOptions} from "./docs/data";
import {observer} from "mobx-react";
import {AppContext} from "../../AppContext";


interface IProps extends RouteComponentProps{
}


interface IState {
    homeAddresses?: HomeAddress;
    operationMode:OperationMode;
    employee:Employee;
    errors:Errors;
}

@observer
class AddFormEmployeeComponent extends Component<IProps, IState> {
    static contextType = AppContext;
    constructor(props:IProps) {
        super(props);

        this.state={
            homeAddresses:{},
            operationMode:{},
            employee:{
                fullName:'',
                age:0
            },
            errors: {},
        }
    }
    addEmployee = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if(this.handleValidation()) {
            let employee:Employee = {
                fullName: this.state.employee.fullName,
                age: this.state.employee.age,
            };
            if(JSON.stringify(this.state.operationMode)!='{}'){
                employee.operationMode=this.state.operationMode;
            }
            if(JSON.stringify(this.state.homeAddresses)!='{}'){
                employee.homeAddresses=this.state.homeAddresses;
            }
            EmployeeService.addEmployee(employee).then(res => {
                this.context.applicationStore.initEmployees()
                console.log('addEmployee:'+JSON.stringify(res.data['emp_id']))
                console.log()
                let emp:Employee=res.data
                this.props.history.push(`/employee/id=${res.data['emp_id']}`,emp);
            });
        }

    }

    handleTimeChange = (event: React.FormEvent<HTMLInputElement>)  =>{
        const target = event.target as HTMLTextAreaElement;
        let hourse=target.value.split(':')[0]
        let minute=target.value.split(':')[1]
        let date = new Date();
        date.setHours(Number(hourse),Number(minute));
        let tempDate=this.state.operationMode
        if (target.name == 'startDay') {
            tempDate.startDay=date
        }
        else {
            tempDate.endDay=date;
        }
        this.setState({
            operationMode:tempDate
        })
    }

    getHoursAndTime(emp: Date | undefined){
        if (emp!=undefined) {
            let date = new Date(emp)
            let options: object = {
                timezone: 'UTC',
                hour: 'numeric',
                minute: 'numeric',
            };
            let time = date.toLocaleString("ru", options)
            return time;
        }
    }
    cancel(){
        this.props.history.push('/')
    }
    handleValidation() {
        let employee = this.state.employee;
        let operationMode=this.state.operationMode;
        let homeAddress=this.state.homeAddresses
        let errors:Errors = {};
        let formIsValid = true;
        if (!employee["fullName"]) {
            formIsValid = false;
            errors.fullName = "Не может быть пустым";
        }
        if (/\d/.test(employee["fullName"])) {
            formIsValid = false;
            errors.fullName = "Не может содержать цифры";
        }
        if (!employee["age"]) {
            formIsValid = false;
            errors.age = "Не может быть пустым";
        }
        if(JSON.stringify(operationMode)!='{}') {
            if (!operationMode["startDay"]) {
                formIsValid = false;
                errors.startDay = "Не может быть пустым";
            }
            if (!operationMode["endDay"]) {
                formIsValid = false;
                errors.endDay = "Не может быть пустым";
            }
        }
        if(JSON.stringify(homeAddress)=='{}') {
            formIsValid = false;
            errors.homeAddress = "Выберите район";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }
    handleChange(field: keyof Employee, e: React.FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLTextAreaElement;
        let value=target.value
        let employee:Employee = this.state.employee;
        // @ts-ignore
        employee[field] = value;
        this.setState({ employee });
    }

    render() {
        return (
            <div>
                <Form >
                    <label>ФИО</label>
                    <Input
                        type="text"
                        name="fullName"
                        placeholder='Имя'
                        onChange={this.handleChange.bind(this, "fullName")}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["fullName"]}</span>
                    <br/>
                    <label>Возраст</label>
                    <Input
                        type="number"
                        name="age"
                        placeholder='Возраст'
                        onChange={this.handleChange.bind(this, "age")}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["age"]}</span>
                    <br/>
                    <label>Домашний адрес:</label>
                    <div>
                        <Form>
                                <Row>
                                    <Col >
                                        <Input
                                            type="text"
                                            name="address"
                                            onChange={(event)=>{
                                                let homeAddresses:HomeAddress | undefined = this.state.homeAddresses;
                                                if(homeAddresses!=undefined)
                                                    homeAddresses.address=event.target.value
                                                this.setState({homeAddresses})
                                            }}
                                            placeholder='Адрес'
                                        />
                                    </Col>
                                    <Col >{
                                        <Select<RegionOptionInterface | RegionOptionInterface, false, GroupedOptionInterface>
                                            placeholder={'Выберите район...'}
                                            options={groupedOptions}
                                            onChange=
                                                {
                                                (event)=>{
                                                    if(event!=null){
                                                        let homeAddresses:HomeAddress | undefined = this.state.homeAddresses;
                                                        if(homeAddresses==undefined) {
                                                            homeAddresses={}
                                                        }
                                                        homeAddresses.district={
                                                            region:{
                                                                region_name : event.region
                                                            },
                                                            district_name:event.value
                                                        }
                                                        this.setState({homeAddresses})
                                                    }
                                                }
                                            }
                                        />
                                    }
                                    <span style={{ color: "red" }}>{this.state.errors["homeAddress"]}</span>
                                    </Col>

                                </Row>
                        </Form>
                    </div>
                    <label>Начало рабочего дня</label>
                    <input
                        type="time"
                        name="startDay"
                        min="00:00"
                        max="23:00"
                        onChange={this.handleTimeChange}
                        value={this.getHoursAndTime(this.state.operationMode.startDay)}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["startDay"]}<br/></span>
                    <label>Конец рабочего дня</label>
                    <input
                        type="time"
                        name="endDay"
                        min="00:00"
                        max="23:00"
                        onChange={this.handleTimeChange}
                        value={this.getHoursAndTime(this.state.operationMode.endDay)}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["endDay"]}<br/><br/></span>

                    <Button variant="outline-success"   onClick={this.addEmployee}>Добавить</Button>{' '}
                    <Button variant="outline-dark" onClick={this.cancel.bind(this)}  >Вернуться к списку сотрудников</Button>
                </Form>
            </div>

        );
    }
}

export default withRouter(AddFormEmployeeComponent);