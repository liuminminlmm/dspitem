import React, { Component } from 'react';
import http from '@/utils/http.js';
import { setCookie } from '@/utils/getcookie.js';
import { connect } from 'react-redux';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            verifycode: ''
        }
        this.loginFn = this.loginFn.bind(this);
    }
    render() {
        let { username, password, verifycode } = this.state;
        return (
            <div className="login">
                {this.props.LocalStoreFn && <div className="mask">{this.props.LocalStoreFn}</div>}
                <h1>登录</h1>
                <p>
                    <label htmlFor='username'>用户名</label><input type="text" placeholder="输入手机号" value={username} name='username' onChange={(e) => { this.handleChange(e) }} />
                </p>
                <p>
                    <label htmlFor='password'>密码</label><input type="password" placeholder="密码至少6位" value={password} name='password' onChange={(e) => { this.handleChange(e) }} />
                </p>
                <p>
                    <label htmlFor='verifycode'>验证码</label><input type="verifycode" placeholder="验证码" value={verifycode} name='verifycode' onChange={(e) => { this.handleChange(e) }} />
                </p>
                {/*<p>
                    <label htmlFor='username'>用户名</label><input type="text" placeholder="输入手机号" ref={this.state.username} />
                </p>
                <p>
                    <label htmlFor='password'>密码</label><input type="password" placeholder="密码至少6位" ref={this.state.password} />
                </p>*/}
                <button onClick={this.loginFn}>登录</button>
            </div>
        )
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    loginFn() {
        if (!this.state.username || !this.state.password) {
            alert('请填写所有信息！');
            return;
        }
        let regPhone = /^1[3578]\d{9}$/;
        if (!regPhone.test(this.state.username)) {
            alert('请输入正确手机号！')
            return;
        }
        let regPassword = /\d{6,}/;
        if (!regPassword.test(this.state.password)) {
            alert('请输入至少6位密码');
            return;
        }
        // 登录对接口的==>正常写法
        let { verifycode } = this.state;
        // http.post('/api/user/login', {
        //     username: this.state.username,
        //     password: this.state.password,
        //     verifycode
        // }).then(res => {
        //     if (res.success == 0) {
        //         setCookie('token', res.token);
        //         this.props.history.replace('/index/home');
        //         // console.log(this.props);
        //         //设置本地储存
        //         // localStorage.setItem('username',res.user.name);
        //         //redux数据管理
        //         this.props.dispatch({
        //             type:'update_user',
        //             payload:res.user.name
        //         })
        //     } else {
        //         alert(res.info);
        //     }
        // })
        //登录对接口的 redux-saga写法
        this.props.loginApi({
            username: this.state.username,
            password: this.state.password,
            verifycode,
            //方法一：
            history: this.props.history
            //方法二：传参history跳转路由还可以使用回调函数
            // callback:()=>{
            //     this.props.history.replace('/index/home');
            // }
        })
    }

}
//用来挂载,可触发dispatch  ==>reducer管理数据
// let hight = connect(function (state) {
//     return {}
// }, ((dispatch) => {
//     return {
//         loginApi(params) {
//             // console.log(params);
// http.post('/api/user/login', params).then(res => {
//     if (res.success == 0) {
//         setCookie('token', res.token);
//         params.history.replace('/index/home');
//         // console.log(this.props);
//         //设置本地储存
//         // localStorage.setItem('username',res.user.name);
//         //redux数据管理
//         dispatch({
//             type: 'update_user',
//             payload: res.user.name
//         })
//     } else {
//         alert(res.info);
//     }
// })
//         }
//     }
// })
// )

//用reducer,redux-saga管理数据
let hight = connect(function (state) {
    return {
        LocalStoreFn: state.LocalStoreFn
    }
}, (dispatch) => {
    return {
        loginApi(params) {
            dispatch({
                type: 'LOGIN_START',
                payload: params
            })
        }
    }
}
)
export default hight(Login);