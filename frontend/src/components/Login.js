import React, {Component} from 'react';
import ListEmployeeComponent from "./ListEmployeeComponent";
import 'bootstrap/dist/css/bootstrap.css'
import {Redirect, Route, Switch} from "react-router-dom";
import FormEmployee from "./FormEmployeeComponent";
import AddFormEmployeeComponent from "./AddFormEmployeeComponent";
import {Button, Form} from "react-bootstrap";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import axios from "axios";




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isAuthenticated: false,
            open: false
        };
    }
    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }
    login = () => {
        const user = {userName: this.state.username, password: this.state.password};
        axios.post("http://localhost:8080/login",user)
            .then(res => {
                const jwtToken = res.headers['authorization'];
                if (jwtToken != null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    this.setState({isAuthenticated: true});
                }
                else {
                    this.setState({open: true});
                }
            })
            .catch(err => console.error(err))
    };
    render() {
        if (sessionStorage.getItem("jwt")) {
            return (
                <div>
                    {window.location.search!=''? <Redirect to='/'/>:''}
                    <HeaderComponent/>
                    <Switch>
                        <Route path='/employee/:id'  component={FormEmployee}></Route>
                        <Route path='/add/employee'  component={AddFormEmployeeComponent}></Route>
                        <Route  path='/'  component={ListEmployeeComponent}></Route>
                    </Switch>
                    <FooterComponent/>
                </div>
            )
        } else {
            return (
                <div className="Login" >
                    <Form >
                        <Form.Group size="lg" controlId="login">
                            <Form.Label>Логин</Form.Label>
                            <Form.Control
                                autoFocus
                                name='username'
                                type="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                name='password'
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button  variant="outline-primary" block size="lg"  type="submit" onClick={this.login}>
                                Вход
                            </Button>
                        </div>
                    </Form>
                </div>

            );
        }
    }
}

export default Login;