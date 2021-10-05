import React, {Component} from 'react';
import EmployeeService from "../services/EmployeeService";
import {Button, Col, Form, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import {Input} from "reactstrap";
import Select from 'react-select';



class AddFormEmployeeComponent extends Component {

    district=[
        {
            region:'ЦАО',
            districts:[
            { label: 'Арбат', value: 'Арбат' },
            { label: 'Замоскворечье', value: 'Замоскворечье' },
            { label: 'Мещанский', value: 'Мещанский' },
            { label: 'Таганский', value: 'Таганский' },
            { label: 'Хамовники', value: 'Хамовники' },
            ]
        },
        {
            region:'ЗАО',
            districts:[
                { label: 'Кунцево', value: 'Кунцево' },
                { label: 'Раменки', value: 'Раменки' },
                { label: 'Можайский', value: 'Можайский' },
                { label: 'Новопеределкино', value: 'Новопеределкино' },
                { label: 'Очаково-Матвеевское', value: 'Очаково-Матвеевское' },
                { label: 'Проспект Вернадского', value: 'Проспект Вернадского' }
            ]
        },
        {
            region:'ЮАО',
            districts:[
                { label: ' Южный округ', value: ' Южный округ' },
                { label: 'Бирюлево Восточное', value: 'Бирюлево Восточное' },
                { label: 'Бирюлево Западное', value: 'Бирюлево Западное' },
                { label: 'Братеево', value: 'Братеево' },
                { label: 'Даниловский', value: 'Даниловский' },
                { label: 'Донской', value: 'Донской' },
                { label: 'Зябликово', value: 'Зябликово' }
            ]
        }
    ]

    region = [
        { label: 'ЦАО', value: 'ЦАО' },
        { label: 'ЗАО', value: 'ЗАО' },
        { label: 'ЮАО', value: 'ЮАО' },
    ];
    constructor(props) {
        super(props);

        this.state={
            homeAddresses:{},
            operationMode:{},
            employee:{},
            errors: {},
        }
    }
    addEmployee = (e) => {
        e.preventDefault();
        if(this.handleValidation()) {
            let employee = {
                fullName: this.state.employee.fullName,
                age: this.state.employee.age,
            };
            if(JSON.stringify(this.state.operationMode)!='{}'){
                employee['operationMode']=this.state.operationMode;
            }
            if(JSON.stringify(this.state.homeAddresses)!='{}'){
                employee['homeAddresses']=this.state.homeAddresses;
            }
            EmployeeService.addEmployee(employee).then(res => {
                console.log('addEmployee:'+JSON.stringify(res.data['emp_id']))
                this.props.history.push(`/employee/id=${res.data['emp_id']}`);
            });
        }

    }

    handleInputChange= event => {
        const { name, value } = event.currentTarget
        this.setState({ [name]: value })
    }
    handleTimeChange = event  =>{
        var hourse=event.target.value.split(':')[0]
        var minute=event.target.value.split(':')[1]
        var date = new Date();
        date.setHours(hourse,minute);
        var tempDate=this.state.operationMode
        if (event.target.name == 'startDay') {
            tempDate.startDay=date
        }
        else {
            tempDate.endDay=date;
        }
        this.setState({
            operationMode:tempDate
        })
    }

    getHoursAndTime(emp){
        var date=new Date(emp)
        var options = {
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
        };
        var time=date.toLocaleString("ru",options)
        return time;
    }
    cancel(){
        this.props.history.push('/')
    }
    handleValidation() {
        let employee = this.state.employee;
        let operationMode=this.state.operationMode;
        let errors = {};
        let formIsValid = true;
        if (!employee["fullName"]) {
            formIsValid = false;
            errors["fullName"] = "Не может быть пустым";
        }
        if (/\d/.test(employee["fullName"])) {
            formIsValid = false;
            errors["fullName"] = "Не может содержать цифры";
        }
        if (!employee["age"]) {
            formIsValid = false;
            errors["age"] = "Не может быть пустым";
        }
        if(JSON.stringify(operationMode)!='{}') {
            if (!operationMode["startDay"]) {
                formIsValid = false;
                errors["startDay"] = "Не может быть пустым";
            }
            if (!operationMode["endDay"]) {
                formIsValid = false;
                errors["endDay"] = "Не может быть пустым";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }
    handleChange(field, e) {
        let employee = this.state.employee;
        employee[field] = e.target.value;
        this.setState({ employee });
    }
    handleChangeAddress(field, e){
        if(e['value']!=null){
            var value=e['value'];
        }else{
            var value=e.target.value
        }
        let homeAddresses = this.state.homeAddresses;
        homeAddresses[field] = value;
        this.setState({ homeAddresses });
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
                        type="text"
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
                                            onChange={this.handleChangeAddress.bind(this, "address")}
                                            placeholder='Адрес'
                                        />
                                    </Col>
                                    <Col >{
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            placeholder='Выберите район'
                                            defaultValue={'Арбат'}
                                            options={this.district.find(i=>i.region==this.state.homeAddresses?.region)?.districts}
                                            onChange={this.handleChangeAddress.bind(this, "district")}
                                            isDisable={false}
                                        />
                                    }
                                    </Col>
                                    <Col>
                                        <Select placeholder='Выберите округ' height='100' options={this.region}
                                                onChange={this.handleChangeAddress.bind(this, "region")}
                                        />
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
                        value={this.getHoursAndTime(this.state?.operationMode?.endDay)}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["endDay"]}<br/><br/></span>

                    <Button variant="outline-dark"   onClick={this.addEmployee}>Добавить</Button>{' '}
                    <Button variant="outline-danger" onClick={this.cancel.bind(this)}  >Вернуться к списку сотрудников</Button>
                </Form>
            </div>

        );
    }
}

export default AddFormEmployeeComponent;