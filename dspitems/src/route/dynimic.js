import React, { Component, Fragment } from 'react';
import Loading from '@/components/loading.jsx';
//component只能写class不能写实例化的
//实现import动态拆分
class DynimicComp extends Component {
    constructor() {
        super();
        this.state = {
            Comp: undefined
        }
    }
    render() {
        const { Comp } = this.state;
        // if (!this.state.Comp) {
        //     return <Loading></Loading>
        // } else {
        //     return <Comp />
        // }
        //做出动画效果
        return (<Fragment>
            <Loading spabing={!this.state.Comp}></Loading>
            {Comp && <Comp />}
        </Fragment>)
    }
    componentDidMount() {
        // const Home = () =>import('@/page/home');
        // console.log(this.props.pathFn())
        // 没办法直接指示名字所以==>在config.js中引用这个(请求数据就是指定名字.js)==>import(/* webpackChunkName:''*/`@/page/${this.props.path}.jsx`).then((comp) => {
        this.props.pathFn().then((comp) => {
            setTimeout(() => {
                this.setState({
                    Comp: comp.default
                })
            }, 2000)
        })
}
}
function HighComp(pathFn) {
    return class extends Component {
        render() {
            return <DynimicComp pathFn={pathFn} />
        }
    }
}
export default HighComp;