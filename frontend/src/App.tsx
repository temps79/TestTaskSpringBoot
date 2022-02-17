import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Login from "./components/authentication/Login";
import {
    BrowserRouter as Router,
} from "react-router-dom";
import {AppContext, stores} from "./AppContext";
import {observer,Provider} from "mobx-react";


@observer
export class App extends React.Component {
    render() {
        return (
            <div>
                <Provider {...stores}>
                    <AppContext.Provider value={stores}>
                        <Router>
                            <div className='content' >
                                <Login />
                            </div>
                        </Router>
                    </AppContext.Provider>
                </Provider>
            </div>
        )
    }
}
export  default App