import React, { Component } from 'react';
import { HashRouter,BrowserRouter, Link,Route,Switch,Redirect } from 'react-router-dom';
import './app.css';
import ReactView from '@/route/routeview';
import config, { routes } from '@/route/config';
import Index from '@/page/index/index.jsx';
import Login from '@/page/login/login.jsx'
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                    <div className="appCont">
                        <ReactView routes={routes}/>
                    </div>
            </BrowserRouter>
        )
    }
}
export default App;