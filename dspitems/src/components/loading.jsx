import React, { Component } from 'react';
import loadings from './puff.svg';

class Loading extends Component {
    constructor(){
        super();
        this.state={
            cls:'loading'
        }
    }
    render() {
        let {spabing} = this.props;
        return (
            spabing && <div className={this.state.cls}>
            <img src={loadings} />
            </div>
        )
    }
    componentDidMount(){
        this.setState({
            cls:'loading active'
        })
    }
    componentWillUnmount(){
         this.setState({
            cls:'loading'
        })
    }
}

export default Loading;