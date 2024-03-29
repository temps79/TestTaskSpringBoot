import React, {Component} from 'react';
import ListEmployeeComponent from "../employee/ListEmployeeComponent";
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter, Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import FormEmployee from "../employee/FormEmployeeComponent";
import AddFormEmployeeComponent from "../employee/AddFormEmployeeComponent";
import {Button, Form} from "react-bootstrap";
import HeaderComponent from "../HeaderComponent";
import FooterComponent from "../FooterComponent";
import axios from "axios";
import {AppContext} from "../../AppContext";
import {inject, observer} from "mobx-react";
import applicationStore from "../../stores/ApplicationStore";
import {withRouter} from "react-router";
import app from "../../App";


interface IProps extends RouteComponentProps {
}


interface IState {
    username: string;
    password:string;
    isAuthenticated:boolean;
    open:boolean;
}


@inject('applicationStore')
@observer
class Login extends Component<IProps, IState> {
    static contextType = AppContext;
    constructor(props:IProps) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isAuthenticated: false,
            open: false
        };
    }
    componentDidMount() {
        if (sessionStorage.getItem("jwt")) {
           applicationStore.initEmployees();
        }
    }

    login = (e: React.KeyboardEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user = {userName: this.state.username, password: this.state.password};
        axios.post("http://localhost:8080/login",user)
            .then(res => {
                const jwtToken = res.headers['authorization'];
                if (jwtToken != null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    sessionStorage.setItem("role",res.data.Role)
                    this.setState({isAuthenticated: true});
                    applicationStore.initEmployees()
                        .then(()=>this.props.history.push('/'))
                }
                else {
                    this.setState({
                        open: true
                    });
                }
            })
            .catch(err => console.error(err))
    };
    render() {
        if (sessionStorage.getItem("jwt")) {
            return (
                <div>
                    <HeaderComponent />
                    {applicationStore.isInitialized &&
                        <BrowserRouter>
                            <Route exact path='/employee/:id' component={FormEmployee}></Route>
                            <Route exact path='/add/employee' component={AddFormEmployeeComponent}></Route>
                            <Route exact path={['/','/registration']} component={ListEmployeeComponent}></Route>
                        </BrowserRouter>
                    }
                    <FooterComponent/>
                </div>
            )
        } else {
            return (
                <div className="Login" >
                    <Form onSubmit={this.login} onKeyDown={(event)=>
                        {
                            if(event.code=='Enter') {
                                this.login(event)
                            }
                        }}>
                        <Form.Group  controlId="login" >
                            <Form.Label>Логин</Form.Label>
                            <Form.Control
                                autoFocus
                                name='username'
                                type="username"
                                value={this.state.username}
                                onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                                    this.setState({username:event.target.value})
                                    }
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                name='password'
                                type="password"
                                value={this.state.password}
                                onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                                    this.setState({password:event.target.value})
                                }}/>
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button  variant="outline-primary" block size="lg"  type="submit" >
                                Вход
                            </Button>
                        </div>
                    </Form>
                </div>

            );
        }
    }
}

export default withRouter(Login);