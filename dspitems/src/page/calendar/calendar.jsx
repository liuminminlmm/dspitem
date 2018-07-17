//日期区间划分有几时几分
import { DatePicker } from 'antd';
import React, { Component } from 'react';
const { RangePicker } = DatePicker;
const onChange = function (params) { }
const onOk = function (params) { }

class Calendar extends Component {
    onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    onOk(value) {
        console.log('onOk: ', value);
    }
    render() {
        return (<div className="calendar">
            <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                placeholder={['Start Time', 'End Time']}
                onChange={onChange}
                onOk={onOk}
            />
        </div>)
    }

};
export default Calendar;
/*//日期区间划分没有有几时几分
import React,{Component} from 'react'
import { DatePicker } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
class Calendar extends Component{
    render(){
        return (
            <div className="calendar">
                <RangePicker onChange={()=>{this.onChange()}} />
            </div>
        )
    }
    onChange(data,dataString){
        // console.log(date, dateString);
    }
}
export default Calendar*/
