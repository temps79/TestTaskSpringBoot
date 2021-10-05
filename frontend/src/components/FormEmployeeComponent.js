import React, {Component} from 'react';
import EmployeeService from "../services/EmployeeService";
import {ListGroup, Table,Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'

class FormEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state={
            employee:{}
        }
    }
    cancel(){
        this.props.history.push('/')
    }
    componentDidMount() {
        var id =this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('id=')+3)
        EmployeeService.getEmployee(id).then((res)=> {
            this.setState({employee:res.data});

        });

    }
    getHourseAndMinute(emp){
        var dateStart=new Date(emp.operationMode.startDay)
        var dateEnd=new Date(emp.operationMode.endDay)
        var options = {
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
        };
        var startDay=dateStart.toLocaleString("ru",options)
        var endDay=dateEnd.toLocaleString("ru",options)
        return startDay+'-'+endDay;
    }
    render() {
        return (
            <div>
                <h2 className='text-center'>Cотрудник</h2>
                <ListGroup >
                    <ListGroup.Item >ФИО:{this.state.employee.fullName}</ListGroup.Item>
                    <ListGroup.Item >Возраст:{this.state.employee.age}</ListGroup.Item>
                    <ListGroup.Item > Домашний адрес:{
                        this.state.employee?.homeAddresses!=null ?(
                            <Table responsive  >
                                {
                                    <tr>{this.state.employee?.homeAddresses?.region+','
                                    +this.state.employee?.homeAddresses?.district+','
                                    +this.state.employee?.homeAddresses?.address+';'}</tr>
                                }
                            </Table>
                        ):' адресов нет'
                    }
                    </ListGroup.Item>
                    <ListGroup.Item >График работы:{
                        this.state.employee.operationMode != null ?
                         this.getHourseAndMinute(this.state.employee)
                        :
                        'График не установлен'
                    }</ListGroup.Item>
                </ListGroup>
                <br/>
                <Button variant="outline-danger" onClick={this.cancel.bind(this)}>Вернуться к списку сотрудников</Button>

            </div>
        );
    }
}

export default FormEmployeeComponent;