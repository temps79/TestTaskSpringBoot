import React, {Component} from 'react';
import EmployeeService from "../../services/EmployeeService";
import {ListGroup, Table, Button, Form, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import {RouteComponentProps} from "react-router-dom";
import {Employee} from "../../interface/EmployeeInterface";
import {withRouter} from "react-router";
import UpdateFormEmployeeComponent from "./UpdateFormEmployeeComponent";
import {inject, observer} from "mobx-react";
import {AppContext} from "../../AppContext";
import applicationStore from "../../stores/ApplicationStore";
import 'bootstrap/dist/css/bootstrap.min.css';



interface IProps extends RouteComponentProps{
}

interface IState {
    employee:Employee;
    editOnly:boolean;
}

@observer
@inject('applicationStore')
class FormEmployeeComponent extends Component<IProps, IState> {
    static contextType = AppContext;
    constructor(props:IProps) {
        super(props);
        this.state={
            employee:{
                fullName:'',
                age:0
            },
            editOnly:false
        }
        this.handler=this.handler.bind(this)
    }
    cancel(){
        this.props.history.push('/')
    }
    remove(){
        let id =this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('id=')+3)
        EmployeeService.removeEmployee(id).then(res=>{
            this.context.applicationStore.initEmployees()
        })
        this.props.history.push('/')

    }
    componentDidMount() {
        let id =this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('id=')+3)

        if(this.props.history.location.state==undefined){
            this.setState({employee: this.context.applicationStore.getEmployeeById(id)});
        }else {
            // @ts-ignore
            this.setState({editOnly: false, employee: this.props.history.location.state});
        }
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
    handler(){
        this.setState({editOnly:false})
    }
    render() {
        if(this.state.editOnly)
        {
            return (
                <div>
                    <UpdateFormEmployeeComponent employee={this.state.employee} handler={this.handler}/>
                </div>
            );
        }
        else{
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
                                        <tr>{
                                            (this.state.employee?.homeAddresses?.territory?.territory?.name ?? ('Регион не выбран'))+','
                                            +(this.state.employee?.homeAddresses?.territory?.name ?? (' район не выбран'))+','
                                            +(this.state.employee?.homeAddresses?.address??'адрес не указан')+';'
                                        }</tr>
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
                    {sessionStorage.role==applicationStore.ADMIN &&
                        <>
                            <Button className={'mr-5'}
                                    variant="outline-dark"
                                    onClick={() => {
                                        this.setState({editOnly: true})
                                    }}>
                                    Редактировать
                            </Button>
                            <Button className={'mr-5'}
                                    variant="outline-danger"
                                    onClick={this.remove.bind(this)}>
                                Удалить
                            </Button>{' '}
                        </>
                    }

                </div>
            );
        }
    }
}

export default withRouter(FormEmployeeComponent);