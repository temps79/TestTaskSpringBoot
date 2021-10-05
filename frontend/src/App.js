import React from 'react'
import './App.css'
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import FormEmployee from "./components/FormEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import AddFormEmployeeComponent from "./components/AddFormEmployeeComponent";
import 'bootstrap/dist/css/bootstrap.css'
import FooterComponent from "./components/FooterComponent";
import Login from "./components/Login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";





function App(){
    return (
        <div>
            <Router>
                <div className='content' >
                    <Login/>
                </div>
            </Router>
        </div>
    );
}
export  default App