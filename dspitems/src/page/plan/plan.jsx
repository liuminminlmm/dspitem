import React, { Component } from 'react';
import http from '@/utils/http.js';
//引入table表格 Modal弹出框 
import { Table, Modal, message } from 'antd';
//引用redux
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './map.js';
class Plan extends Component {
    constructor() {
        super();
        this.state = {
            //表格数据列表
            dataSource: [],
            visible: false,
            deleteItem: null
        }
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    render() {
        let that = this;
        // 设置表头信息  title是表头  dataIndex是typename
        let columns = [{
            title: '计划ID',
            dataIndex: 'key'
        }, {
            title: '计划名称',
            dataIndex: 'name'
        }, {
            title: '投放目的',
            dataIndex: 'promotionType'
        }, {
            title: '日预算',
            dataIndex: 'dayBudget'
        }, {
            title: '今日消耗',
            dataIndex: 'clickPrice'
        }, {
            title: '总消耗',
            dataIndex: 'consumed'
        }, {
            title: '曝光量',
            dataIndex: 'exposeNum'
        }, {
            title: '点击量',
            dataIndex: 'clickNum'
        }, {
            title: '点击率',
            dataIndex: 'clickRate'
        }, {
            title: '状态',
            dataIndex: 'status'
        }, {
            title: '',
            key: 'operation',
            render: (text, record) => {
                // console.log(record);
                function del(record) {
                    that.setState({
                        visible: true,
                        deleteItem: record
                    })

                }
                return (
                    <span>
                        <a onClick={() => { del(record) }} href="javascript:;">X</a>
                    </span>
                )
            }
        },];
        return (
            <div className="plan">
                <h3>DD-广告测试团队-2017-1102-4<span>计划</span></h3>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>你确定要删除？...</p>
                </Modal>
                <Table dataSource={this.props.planlistFn} columns={columns}></Table>
            </div>
        )
    }
    handleOk() {
        //更新删除数据 ，用reducer封装
        this.props.delplanlist(`${this.state.deleteItem.key}`);
        //异步请求删除的接口
        // http.get(`/dsp-advert/campaigns/delete/${this.state.deleteItem.key}`).then(res => {
        //    if(res.status===0){
        //        message.success('删除成功！')
        //    }
        // })
        this.setState({
            visible: false
        })
    }
    handleCancel() {
        this.setState({
            visible: false
        })
    }
    componentDidMount() {
        //更新计划数据 ，用reducer封装
        this.props.updateplanlist();
        // console.log(this.props.planlistFn);
        //请求计划列表接口 ==>前台进行数据管理
        // http.post('/dsp-advert/campaigns/list', {
        //     "queryType": 1,
        //     "queryContent": "AD-JXS-201612-00104",
        //     "pageNum": 1,
        //     "pageSize": 50,//如果为空 默认是50,大于100 按照100处理
        //     "statusList": [1, 2, 3],  //计划状态
        //     "startTime": 12345678,//计划列表中统计数据的起始时间
        //     "endTime": 12345679876543,//默认T-7
        // }).then(res => {
        //     // console.log(res);
        //     this.setState({
        //         dataSource: res.data.list
        //     })

        // }
        //     )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Plan);