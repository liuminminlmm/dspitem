import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getCookie } from './../utils/getcookie.js';
class ReactView extends Component {
    render() {
        let { routes } = this.props;
        return (
            <Switch>
                {
                    routes.map((item, i) => {
                        return (
                             //在render={()=>{}}挂载match
                            <Route key={i} path={item.path} exact={item.exact || false} render={(routerApi) => {        
                                //相当于Vue中导航守卫beforeEach 不判断这个if (item.path == '/login'，会报错一个数组 </Route>+ <Switch>
                                if (item.path == '/login' || getCookie('token')) {
                                    return <item.component routes={item.children} key={i} {...routerApi} />
                                } else {
                                    return <Redirect to={{ pathname: "/login", state: { from: item.path } }} />
                                }
                            }} key={i}></Route>
                        )
                    })
                }
            </Switch>
        )
    }
}

export default ReactView;


