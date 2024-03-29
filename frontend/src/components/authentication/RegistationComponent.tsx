import React, {Component} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import RegistrationService from "../../services/RegistrationService";
import {RouteComponentProps} from "react-router-dom";
import {withRouter} from "react-router";
import {Errors} from "../../interface/ErrorsInterface";
import applicationStore from "../../stores/ApplicationStore";
import Select from "react-select";
import {inject} from "mobx-react";

interface IProps extends RouteComponentProps{
}

interface IState {
    errors:Errors;
    open:boolean;
    login:string;
    password:string;
    confirmPassword:string;
    role:string;
}
@inject('applicationStore')
class RegistationComponent extends Component<IProps, IState> {
    constructor(props:IProps) {
        super(props);
        this.state = {
            errors: {},
            open:false,
            login:'',
            password:'',
            confirmPassword:'',
            role:'ADMIN'
        }
    }
    options = [
        { value: 'ADMIN', label: 'Администратор' },
        { value: 'USER', label: 'Гость' },
    ];
    componentDidMount() {
        if(sessionStorage.role!=applicationStore.ADMIN) this.props.history.push('/')
        this.setState({
            open:true
        })
    }
    componentDidUpdate() {
        if(!this.state.open)
            this.props.history.push('/')
    }
    registration=(e:React.MouseEvent<HTMLElement>)=>{
        e.preventDefault();
        if(this.validation()){
            RegistrationService.registration(this.state.login, this.state.password,this.state.role).then(r => {
                if(r.data==''){
                    let errors = this.state.errors;
                    errors["login"]="Уже существует такой пользователь"
                    this.setState({errors:errors})
                }else{
                    alert('Новый пользователь зарегистрирован\n Логин:'+this.state.password+'\nПароль:'+this.state.login)
                    this.props.history.push('/')
                }
            })
        }
    }

    validation(){
        let formIsValid = true;
        let errors:Errors = {};
        if(this.state.password!=this.state.confirmPassword){
            errors.password = "Пароли не совпадают";
            formIsValid=false;
        }
        this.setState({ errors: errors });
        return formIsValid
    }
    render() {
        return (
            <div>
                    <Modal
                        size="lg"
                        show={this.state.open}
                        onHide={() => this.setState({open: false})}
                        centered>
                        <Modal.Header>
                            <Modal.Title>Регистрация</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Логин</Form.Label>
                                    <Form.Control type="login"
                                                  name='login'
                                                  placeholder="Введите логин"
                                                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                      this.setState({login: event.target.value})
                                                  }}/>
                                    <span style={{color: "red"}}>{this.state.errors["login"]}</span>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control type="password"
                                                  name='password'
                                                  placeholder="Пароль"
                                                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                      this.setState({password: event.target.value})
                                                  }}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Подтверждение пароля</Form.Label>
                                    <Form.Control type="password"
                                                  name='confirmPassword'
                                                  placeholder="Подтвердите пароль"
                                                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                      this.setState({confirmPassword: event.target.value})
                                                  }
                                                  }/>

                                    <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Права доступа</Form.Label>
                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        defaultValue={(this.options)[0]}
                                        name="color"
                                        options={this.options}
                                        onChange={(event:any)=>{
                                            this.setState({role:event.value})
                                        }}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit" onClick={this.registration}>
                                Регистрация
                            </Button>
                            <Button variant="secondary" onClick={() => this.setState({open: false})}>
                                Закрыть
                            </Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        );
    }
}

export default withRouter(RegistationComponent);