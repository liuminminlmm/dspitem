<!--
  项目总结：
  开始==>  1> 登录页面1级路由   setCookie('token', res.token); 
                      (封装路由)路由接受子组件时判断  if(item.path=='/login'||getCookie('token'){}else {
                                return <Redirect to={{ pathname: "/login", state: { from: item.path } }} />
           2> 用户名存在1级路由(index页面)
           3> index页面下有一些2级路由
           4> index/home页面引用了antd的插件  =>日期选择(日历) 
                     echarts的插件 =>绘图(近7天...)
           5> index.plan页面引用了antd的插件  =>引入table表格 Modal弹出框 
                    用redux进行数据管理 componentDidMount(){}更新数据  if(res.status===0){}弹出弹出框删除成功
                一：删除相应数据：Table组件上有columns属性中有==>render:(text,record)=>{}record都是后台传递的数据，在这里利用key传递get方式在地址栏，利用 delplanlist(id){}函数判断if(res.status===0){}删除成功
                二：弹出 ：Modal组件上利用visible判断布尔值 setSatate({})更新控制是否弹出
           6>利用redux-saga做中间件处理副作用(一些异步请求)
  
  
 项目重点： 
   正常： redux:dispatch(action)==> reduer(判断action.type)
加入saga后 ： redux:dispatch(action)==>redux-saga(异步操作)==>dispatch一个新action(异步数据管理) ==>reduer(判断action.type)


  1:redux-thunk:  中间件dispatch返回一个函数 dispatch((dispatch)=>{在这里接受的dispatch({函数}==>刷新数据)})
    dispatch((dispatch)=>{
           http.post('/dsp-advert/campaigns/list', {
                "queryType": 1,
                "queryContent": "AD-JXS-201612-00104",
                "pageNum": 1,
                "pageSize": 50,//如果为空 默认是50,大于100 按照100处理
                "statusList": [1, 2, 3],  //计划状态
                "startTime": 12345678,//计划列表中统计数据的起始时间
                "endTime": 12345679876543,//默认T-7
            }).then(res => {
                // console.log(res);
                //dispatch是用来更新reducer数据的
                dispatch({
                    type: 'update_planlist',
                    payload: res.data.list
                })
            }
                )
    })

    2:redux-saga:==>配合使用babel-plugin-transform-runtime插件(es7)==>   异步数据管理是一个数据库，saga是一个单线程结合generator函数的,作用是让副作用管理==>异步流程，更容易(例:异步获取数据,访问浏览器缓存);
    使用： import createSagaMiddleware from 'redux-saga';
            let sagaMiddleware = createSagaMiddleware();
            let store = createStore(reducer,applymiddleware(sagaMiddleware));
        //run监听 sagaMiddleware.run(sagas);

    
    3：generator函数使用可以写多次的yield==>   yield只能执行一次（必须手动调用）
    形式：
    function* test(){
        let res = yield new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(123);
            },2000)
        })
        let res2 = yield 1+2;
    }
    let work = test();
  work.test(); 第一次调用是返回Vualue =>Promise上有resolve的状态  false
  work.test(); 第二次调用返回Value =>123,3  false
  work.test(); 第三次调用返回Value =>undefined    true
    export default test;
    -->


    