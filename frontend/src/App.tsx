import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Login from "./components/authentication/Login";
import {
    BrowserRouter as Router,
} from "react-router-dom";




function App(){
    return (
        <div>
            <Router>
                <div className='content' >
                    <Login />
                </div>
            </Router>
        </div>
    );
}
export  default App