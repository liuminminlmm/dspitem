import React, { Component } from 'react';
import ReactView from '@/route/routeview';
import config, { routes } from '@/route/config';
import {Link} from 'react-router-dom';
class Tool extends Component {
    constructor(){
        super();
            this.goaccount = this.goaccount.bind(this);
    }
    render() {
        // console.log(this.props);
        let {routes} = this.props;
        return (
            <div className="tool">
                <Link to="/tool/account">账号管理</Link>
                <button onClick={this.goaccount}>账号管理</button>
                <Link to="/tool/customer">客户管理</Link>
                <ReactView routes={routes} />
            </div>
        )
    }
    goaccount(){
        this.props.history.push('/tool/account');
    }
}
export default Tool;