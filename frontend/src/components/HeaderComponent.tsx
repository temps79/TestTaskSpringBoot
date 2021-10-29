import React, {Component} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import ApexChart from "./ApexChart";
import ExportExcelComponent from "./ExportExcelComponent";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import RegistationComponent from "./authentication/RegistationComponent";
import {History, LocationState} from "history";
import { withRouter } from "react-router";

interface IProps extends RouteComponentProps{
}

class HeaderComponent extends Component<IProps,{}> {
    onHandle(){

    }
    render() {
        return (
            <div className="header">
                <Navbar  fixed="top"  bg="dark" variant="dark">
                        <Container className='header-container' >
                            <Nav className="me-auto">
                                <Navbar.Brand >
                                    Менеджер по работе сотрудников
                                </Navbar.Brand>
                                <Nav.Link href='/apexchart'>
                                    График распределения сотрудников по возрастам
                                </Nav.Link>
                                <Nav.Link  href='/download'>
                                    Выгрузка списка в Excel
                                </Nav.Link>
                                <Nav.Link  href='/registration' >
                                    Регистрация
                                </Nav.Link>
                            </Nav>
                                <Nav.Item>
                                    <Button variant="outline-light" href={"/"} onClick={()=>{
                                        sessionStorage.clear()
                                        this.props.history.push('/')
                                    }}>Выход</Button>
                                </Nav.Item>
                        </Container>
                </Navbar >
                <Switch>
                    <Route path='/download'    component={ExportExcelComponent}/>
                    <Route exact path='/registration'  component={RegistationComponent}/>
                    <Route  exact path='/apexchart'  component={ApexChart}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(HeaderComponent);