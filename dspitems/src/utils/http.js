import React, { Component } from 'react';
import {getCookie} from '@/utils/getcookie.js';
let querystring = {
    //对象转换成字符串
    styingify(obj) {
        var str = '';
        for (let i in obj) {
            str += i + '=' + obj[i] + '&'
        }
        str = str.slice(0, -1);
        // console.log(str.slice(0,-1))
        return str;
    },
    //字符串转换为对象
    obj(str) {
        let arr = str.split('&');
        let o = {};
        arr.forEach((item, i) => {
            // console.log(item);
            let arr2 = item.split('=');
            // console.log(arr2);
            o[arr2[0]] = arr2[1];
        })
        return o;
    }
}
console.log(process.env);
let domin = 'http://localhost:9000'
export default {
    //get里面传递的url是前面传递的实参
    get(url, params) {
        //对象转字符串 console.log(querystring.styingify({ a: '1', b: '2', c: '' }));
        //字符串转对象 console.log(querystring.obj('a=1&b=2&c='));
        let par = querystring.styingify(params);
        if (url.indexOf('?') > -1) {
            url = url + '&' + par;
        } else {
            url = url + '?' + par;
        }
        return new Promise((resolve, reject) => {
            fetch(domin + url, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                //body相当于请求体
                .then(body => body.json())
                .then(res => {
                    resolve(res);
                })

        })
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            fetch(domin + url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "Authrization":getCookie('token') //封装成全局的
                },
                body: JSON.stringify(params)
            })
                .then(body => body.json())
                .then(res => {
                    resolve(res)
                })
                .catch(function (ex) {
                    console.log('parsing failed', ex)
                })
        })
    }
}


//抛出组件
// export default {
//     install(React) {
//         //防止$http被覆盖
//         Object.defineProperty(React.prototype, '$http', {
//             value: httpInstance
//         })
//     }
// }