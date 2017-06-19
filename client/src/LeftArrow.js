import React, { Component } from 'react';


class LeftArrow extends Component {
    constructor(props){
        super(props);
        this.state = {mode: 'javascript', msg: 'test'};
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    updateMsgInState(newMsg) {
        this.setState({
            msg: newMsg
        })
    }

    handleClick() {
        this.updateMsgInState('new msg');
    }

    render() {
        return(
            <div className="arrow-key left" data-key="37" onClick={this.handleClick}></div>
        )
    }
}

export default LeftArrow;
