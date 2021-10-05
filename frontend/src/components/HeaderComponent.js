import React, {Component} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import ApexChart from "./ApexChart";
import ExportExcelComponent from "./ExportExcelComponent";
import {Route, Switch} from "react-router-dom";



class HeaderComponent extends Component {

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
                    <Route path='/download'    component={ExportExcelComponent}></Route>
                    <Route  exact path='/apexchart'  component={ApexChart}/>
                </Switch>
            </div>
        );
    }
}

export default HeaderComponent;