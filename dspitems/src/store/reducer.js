import { combineReducers } from 'redux';
import { USER_SUCCESS, USER_PENDING, GET_USER } from './type.js';
function LocalStoreFn(state = '', action) {
    // console.log(action);
    //做遮罩层
    switch (action.type) {
        case GET_USER: state = "start";
            break;
        case USER_PENDING: state = "pending";
            break;
        case USER_SUCCESS: state = "success";
            break;
    }
    return state;
}
//请求计划列表
function planlistFn(state = [], action) {
    if (action.type == 'update_planlist') {
        return action.payload;
    }
    return state;
}


//引用插件combineReducers({})进行合并抛出(内部进行了一些封装)  ==>方法一
let reducer = combineReducers({
    LocalStoreFn,
    planlistFn
})
//手动 return{}回来一个组件  ==>方法二
// function reducer(state,actions){
//     return {
//         LocalStoreFn:LocalStoreFn(state.user,actions)
//     }
// }
export default reducer;