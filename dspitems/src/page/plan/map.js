import http from '@/utils/http.js';
import { Table, Modal, message } from 'antd';
//mapStateToProps(){}用来接收reducer传递出来的数据 
export function mapStateToProps(state) {
    // console.log(state);
    return {
        planlistFn: state.planlistFn
    }
}

//mapDispatchToProps(){}管理dispatch触发action.type
export function mapDispatchToProps(dispatch) {
    return {
        updateplanlist() {
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

        },
        delplanlist(id) {
            http.get(`/dsp-advert/campaigns/delete/id`).then(res => {
                if (res.status === 0) {
                    message.success('删除成功！');
                    //更新数据
                    this.updateplanlist();
                }
            })
        }
    }
}