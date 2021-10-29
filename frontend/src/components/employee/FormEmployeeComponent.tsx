import React, {Component} from 'react';
import EmployeeService from "../../services/EmployeeService";
import {ListGroup, Table,Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import {RouteComponentProps} from "react-router-dom";
import {HomeAddress} from "../../interface/HomeAddressInterface";
import {OperationMode} from "../../interface/OperationModeInterface";
import {Employee} from "../../interface/EmployeeInterface";
import {Errors} from "../../interface/ErrorsInterface";
import {withRouter} from "react-router";


interface IProps extends RouteComponentProps{
}

interface IState {
    employee:Employee;
}

class FormEmployeeComponent extends Component<IProps, IState> {
    constructor(props:IProps) {
        super(props);

        this.state={
            employee:{
                fullName:'',
                age:0
            }
        }
    }
    cancel(){
        this.props.history.push('/')
    }
    remove(){
        let id =this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('id=')+3)
        EmployeeService.removeEmployee(id)
        this.props.history.push('/')
    }
    componentDidMount() {
        let id =this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('id=')+3)
        EmployeeService.getEmployee(id).then((res)=> {
            this.setState({employee:res.data});

        });

    }
    getHourseAndMinute(emp: Employee){
        const options = new Intl.DateTimeFormat('ru',{
            hour: 'numeric',
            minute: 'numeric',
        });
        if(emp.operationMode!=undefined) {
            if(emp.operationMode.startDay!=undefined && emp.operationMode.endDay!=undefined ) {
                const dateStart = new Date(emp.operationMode.startDay);
                const dateEnd = new Date(emp.operationMode.endDay);
                const startDay = options.format(dateStart);
                const endDay = options.format(dateEnd);
                dateEnd.toLocaleString()
                return startDay+'-'+endDay;
            }
        }

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
                                    <tr>{this.state.employee!.homeAddresses!.district!.region?.region_name+','
                                    +this.state.employee?.homeAddresses?.district?.district_name+','
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
                <Button variant="outline-dark" onClick={this.cancel.bind(this)}>Вернуться к списку сотрудников</Button>{' '}
                <Button variant="outline-danger" onClick={this.remove.bind(this)}>Удалить</Button>

            </div>
        );
    }
}

export default withRouter(FormEmployeeComponent);