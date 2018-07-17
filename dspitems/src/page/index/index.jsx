import React, { Component, Fragment } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
//引入antd插件
import { Menu, Icon, Button, Dropdown } from 'antd';
//import动态抽离
import ReactView from '@/route/routeview.js';
//redux封装
import { connect } from 'react-redux';
const SubMenu = Menu.SubMenu;
//删除cookie
import { delCookie } from './../../utils/getcookie.js';
//封装一个下拉组件,纯函数没有任何周期函数
function SelectFn(props) {
   let users = JSON.parse(localStorage.getItem('username'));
    return (
        <Menu onClick={(e) => {
            if (e.key === '1') {
                delCookie('token');
                props.history.replace('/login');
            }else if(e.key === '0'){
                document.querySelector('.users').innerHTML=`欢迎${users}用户`; 
            }
        }}>
            <Menu.Item key="0">
                欢迎
            </Menu.Item>
            <Menu.Item key="1">
                退出
            </Menu.Item>
        </Menu>
    )
}
class Index extends Component {
    constructor() {
        super()
        this.state = {
            collapsed: false,
            user: ''
        }
    }
    render() {
        return (
            <Fragment>
                <div className="app">
                    <div className="appTop">
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                            inlineCollapsed={this.state.collapsed}
                        >
                            <Menu.Item key="1">
                                <Icon type="pie-chart" />
                                <span><Link to="/index/home">首页概览</Link></span>
                            </Menu.Item>
                            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>广告管理</span></span>}>
                                <Menu.Item key="9"><span><Link to="/index/plan">广告计划</Link></span></Menu.Item>
                                <Menu.Item key="10"><span><Link to="/index/uint">广告单元</Link></span></Menu.Item>
                                <Menu.Item key="11"><span><Link to="/index/idea">广告创意</Link></span></Menu.Item>
                            </SubMenu>
                            <Menu.Item key="3">
                                <Icon type="inbox" />
                                <span><Link to="/index/datacenter">数据中心</Link></span>
                            </Menu.Item>
                            <SubMenu key="sub1" title={<span><Icon type="mail" /><span><Link to="/index/tool">工具箱</Link></span></span>}>
                            </SubMenu>
                        </Menu>
                    </div>
                    <div className="appCont">
                        <div className="alltop">
                            {/* 用redux存储数据时会刷新页面，有路由数据会消失 <h3>{ this.props.LocalStoreFn}</h3>*/}
                            {/*获取本地存储*/}
                            <Dropdown overlay={<SelectFn history={this.props.history}/>}>
                                <div className="users">{this.state.user}</div>
                            </Dropdown>
                        </div>
                        <ReactView routes={this.props.routes} />
                    </div>
                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        console.log(this.state.user);
        this.setState({
            user: localStorage.getItem('username')
        })

    }
}
//redux数据管理
// let hight = connect(function(state){
//     console.log(state)
//     return {
//         LocalStoreFn:state.LocalStoreFn
//     }
// })

// export default hight(Index);
export default Index;
