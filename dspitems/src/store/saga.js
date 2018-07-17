// saga()中有3个参数  
// call(test,params),  
// put(params), 
// watcher-saga:takeEvery(actionType,worker-saga)

import { setCookie } from '@/utils/getcookie.js';
//saga是一个generator函数
import { call, put, takeEvery } from 'redux-saga/effects';
import http from '@/utils/http.js';
//原始形态模拟
function* workerSaga(payload) {
    // console.log(payload);
    //捕获错误
    try {
        let res = yield call(http.post, '/api/user/login', {});
        // console.log(res);
        yield put({
            type: 'GET_USER',
            payload: res
        })
    } catch (err) {
        yield put({
            type: 'GET_USER_ERR',
            payload: err
        })
    }

}

//login接口的实现    
//传过来的参数payload:是dispatch传递过来的type,params
function* login(payload) {
    let { username, password, verifycode, history } = payload.payload;
    yield put({
        type: 'GET_USER'
    })
    let [res,] = yield [call(http.post, '/api/user/login', { username, password, verifycode }),
    put({
        type: 'USER_PENDING'
    })
    ];
    yield put({
        type: 'USER_SUCCESS',
        payload: res
    })
    // http.post('/api/user/login',payload.action).then(res => {
    yield setCookie('token', res.token); localStorage.setItem('username', res.user.name);//设置本地储存
    yield history.replace('/index/home');

}
export default function* watcherSaga() {
    //第一个触发监听名字，第二个是generator函数
    // yield takeEvery('update_user', workerSaga);
    //监听多个用[] = []
    yield [takeEvery('update_user', workerSaga), takeEvery('LOGIN_START', login)];
}