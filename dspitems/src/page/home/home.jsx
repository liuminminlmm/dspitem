import React, { Component, Fragment } from 'react';
import './home.css';
import moment from 'moment';
import Calendar from '../calendar/calendar.jsx';
import http from '@/utils/http.js';
let echarts = require('echarts');
class Home extends Component {
    constructor() {
        super();
        this.state = {
            flag: false,
            flags: false
        }
        this.selectFn = this.selectFn.bind(this);
        this.matterFn = this.matterFn.bind(this);
    }
    render() {
        return (
            <div className="home">
                <Fragment>
                    <div className="homeTop">
                        <span onClick={this.selectFn}>￥</span>
                        <span onClick={this.matterFn}>!</span>
                        <em>账号ID:</em>
                    </div>
                    {this.state.flag && <div className="TopCont">
                        <p>现金账户:<span>￥11</span></p>
                        <p>今日消耗:<span>￥0</span></p>
                    </div>}
                    {this.state.flags && <div className="TopCont2">
                        <p>如有问题</p>
                        <p>现金账户:<span>￥11</span></p>
                    </div>}
                </Fragment>
                <div className="homeCont">
                    <p>现金账户:￥11</p>
                    <p>今日消耗:￥0</p>
                </div>
                <div className="homeFooter">
                    <p><span>整体情况</span>
                        <em>近7天</em>
                        <em>近30天</em>
                    </p>
                    <Calendar></Calendar>
                </div>
                <div className="print" ref="print"></div>
            </div>
        )
    }
    selectFn() {
        let { flag } = this.state;
        this.setState({
            flag: !flag
        })
    }
    matterFn() {
        let { flags } = this.state;
        this.setState({
            flags: !flags
        })
    }
    componentDidMount() {
        //echarts实例化，上面有很多配置项，用来绘图的
        let echartsInstance = echarts.init(this.refs.print);
        //设置到option上
        // echartsInstance.setOption(option);
        //全局自适应，大小自适应===>像弹性盒
        window.onresize = function () {
            //获取当前图像的宽和高
            echartsInstance.resize()
        }
        //设置默认近7天情况
        // this.setDate([moment().subtract(7, 'days').format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")]);

        let date = new Date();
        let arr = [];
        // console.log(moment().month(date.getMonth()).format("YYYY-MM-DD"));
        // console.log(moment().add(1, 'days').format("YYYY-MM-DD"));
        for (let i = 1; i <= 7; i++) {
            //用moment操作时间==>moment()不传值代表当前时间   subtract减  add加 unshift操作数组时间从小到大
            arr.unshift(moment().subtract(i, 'days').format("YYYY-MM-DD"))
        }
        //设置绘图的配置项，在官方实例中
        let option = {
            // X轴
            xAxis: {
                type: 'category',
                data: arr
            },
            // Y轴
            yAxis: {
                type: 'value'
            },
            // 标尺
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        };

        //请求绘图接口，用count控制传递的条数
        http.get('/dsp-report/index', { count: 10 }).then(res => {
            //console.log(res);
            option.xAxis.data = arr;
            //日期区间动态渲染
            option.series[0].data = res.data.dataY1;
            setTimeout(() => {
                echartsInstance.setOption(option)
            }, 2000)
        })
    }
}
export default Home;