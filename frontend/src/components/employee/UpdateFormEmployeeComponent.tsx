import React, {Component} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {Input} from "reactstrap";
import {HomeAddress} from "../../interface/HomeAddressInterface";
import Select from "react-select";
import {RegionOptionInterface} from "../../interface/RegionOptionInterface";
import {GroupedOptionInterface} from "../../interface/GroupOptionInterface";
import {CaoOptions, groupedOptions, UaoOptions, ZaoOptions} from "./docs/data";
import {RouteComponentProps} from "react-router-dom";
import {Employee} from "../../interface/EmployeeInterface";
import {Errors} from "../../interface/ErrorsInterface";
import EmployeeService from "../../services/EmployeeService";
import {withRouter} from "react-router";
import {AppContext} from "../../AppContext";

interface IProps extends RouteComponentProps{
    employee:Employee;
    handler:() => void;
}

interface IState {
    employee:Employee;
    errors:Errors;
}


class UpdateFormEmployeeComponent extends Component<IProps, IState> {
    static contextType = AppContext;
    constructor(props:IProps) {
        super(props);


        this.state={
            employee:props.employee,
            errors: {},
        }

    }
    handleChange(field: keyof Employee, e: React.FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLTextAreaElement;
        let value=target.value
        let employee:Employee = this.state.employee;
        // @ts-ignore
        employee[field] = value;
        this.setState({ employee });
    }
    findAttr(){
        let resArray=[...CaoOptions,...ZaoOptions,...UaoOptions]
        let district= resArray.filter(el=>{
            if(el.value==this.state.employee.homeAddresses?.territory?.name)
                return el
        })
        return district[0] as RegionOptionInterface;
    }
    handleTimeChange = (event: React.FormEvent<HTMLInputElement>)  =>{
        const target = event.target as HTMLTextAreaElement;
        let hourse=target.value.split(':')[0]
        let minute=target.value.split(':')[1]
        let date = new Date();
        date.setHours(Number(hourse),Number(minute));
        let tempDate=this.state.employee.operationMode
        if(tempDate==null)
            tempDate={}
        if (target.name == 'startDay') {
            tempDate!.startDay=date
        }
        else {
            tempDate!.endDay=date;
        }
        let emp=this.state.employee
        emp.operationMode=tempDate
        this.setState({
            employee:emp
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
    updateEmployee = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if(this.handleValidation()) {
            EmployeeService.updateEmployee(this.state.employee.emp_id,this.state.employee).then(res => {
                this.context.applicationStore.initEmployees()
                this.props.history.push(`/employee/id=${res.data['emp_id']}`,res.data);
            });
            this.props.handler()
        }
    }
    handleValidation() {
        let employee = this.state.employee;
        let operationMode=this.state.employee.operationMode;
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
        if(JSON.stringify(operationMode)!='null') {
            if (!operationMode?.startDay) {
                formIsValid = false;
                errors.startDay = "Не может быть пустым";
            }
            if (JSON.stringify(operationMode?.startDay)=='null') {
                formIsValid = false;
                errors.startDay = "Не может быть пустым";
            }
            if (JSON.stringify(operationMode?.endDay)=='null') {
                formIsValid = false;
                errors.endDay = "Не может быть пустым";
            }
            if (!operationMode?.endDay) {
                formIsValid = false;
                errors.endDay = "Не может быть пустым";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }
    render() {
        return (
            <div>
                <h2 className='text-center'>Редактор сотрудника</h2>
                <Form >
                    <label>ФИО</label>
                    <Input
                        type="text"
                        name="fullName"
                        placeholder='Имя'
                        value={this.state.employee.fullName}
                        onChange={this.handleChange.bind(this, "fullName")}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["fullName"]}</span>
                    <br/>
                    <label>Возраст</label>
                    <Input
                        type="number"
                        name="age"
                        placeholder='Возраст'
                        value={this.state.employee.age}
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
                                            let homeAddresses:HomeAddress | undefined = this.state.employee.homeAddresses;
                                            if(homeAddresses!=undefined)
                                                homeAddresses.address=event.target.value
                                            let emp=this.state.employee
                                            emp.homeAddresses=homeAddresses
                                            this.setState({employee:emp})
                                        }}
                                        value={this.state.employee.homeAddresses?.address}
                                        placeholder='Адрес'
                                    />
                                </Col>
                                <Col >{
                                    <Select<RegionOptionInterface , false, GroupedOptionInterface>
                                        placeholder={'Выберите район...'}
                                        options={groupedOptions}
                                        value={this.findAttr()}
                                        onChange=
                                            {
                                                (event)=>{
                                                    if(event!=null){
                                                        let homeAddresses:HomeAddress | undefined = this.state.employee.homeAddresses;
                                                        if(homeAddresses==undefined) {
                                                            homeAddresses={}
                                                        }
                                                        homeAddresses.territory={
                                                            territory:{
                                                                name : event.region
                                                            },
                                                            name:event.value
                                                        }
                                                        let emp=this.state.employee
                                                        emp.homeAddresses=homeAddresses
                                                        this.setState({employee:emp})
                                                    }
                                                }
                                            }
                                    />
                                }
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
                        value={this.getHoursAndTime(this.state.employee.operationMode?.startDay)}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["startDay"]}<br/></span>
                    <label>Конец рабочего дня</label>
                    <input
                        type="time"
                        name="endDay"
                        min="00:00"
                        max="23:00"
                        onChange={this.handleTimeChange}
                        value={this.getHoursAndTime(this.state.employee.operationMode?.endDay)}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["endDay"]}<br/></span>
                    <Button variant="outline-success"  onClick={this.updateEmployee}>Изменить </Button>{' '}
                    <Button variant="outline-dark" onClick={this.props.handler}  >Отмена</Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(UpdateFormEmployeeComponent);