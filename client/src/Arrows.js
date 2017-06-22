import React, { Component } from 'react';


class Arrows extends Component {
    constructor(props){
        super(props);
        this.state = {mode: 'javascript', msg: 'test'};
        // This binding is necessary to make `this` work in the callback
        this.handleClickUp = this.handleClickUp.bind(this);
        this.handleClickLeft = this.handleClickLeft.bind(this);
        this.handleClickDown = this.handleClickDown.bind(this);
        this.handleClickRight = this.handleClickRight.bind(this);
    }

    updateMsgInState(newMsg) {
        this.setState({
            msg: newMsg
        })
    }

    handleClickUp() {
        this.props.socket.io.emit('go forward');
    }

    handleClickLeft() {
        this.props.socket.io.emit('left');
    }

    handleClickDown() {
        this.props.socket.io.emit('stop');
    }

    handleClickRight() {
        this.props.socket.io.emit('right');
    }

    render() {
        return(

            <div className="arrow-key-container">
                <div className="arrow-key up" data-key="38" onClick={this.handleClickUp}></div><br/>
                <div className="arrow-key left" data-key="37" onClick={this.handleClickLeft}></div>
                <div className="arrow-key down" data-key="40" onClick={this.handleClickDown}></div>
                <div className="arrow-key right" data-key="39" onClick={this.handleClickRight}></div>
                <p>{this.props.title}</p>
            </div>
        )
    }
}

export default Arrows;
