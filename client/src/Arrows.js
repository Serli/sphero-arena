import React, { Component } from 'react';


class Arrows extends Component {
    constructor(props){
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.handleClickUp = this.handleClickUp.bind(this);
        this.handleClickLeft = this.handleClickLeft.bind(this);
        this.handleClickRight = this.handleClickRight.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClickUp() {
        let socket = this.props.socket;
        this.up = setInterval(function () {
            socket.emit('go forward');
        }, 500);
    }

    handleClickLeft() {
        let socket = this.props.socket;
        this.left = setInterval(function () {
            socket.emit('left');
        }, 500);
    }

    handleClickRight() {
        let socket = this.props.socket;
        this.var = setInterval(function () {
            socket.emit('right');
        }, 500);
    }

    handleChange() {
        clearInterval(this.var);
        clearInterval(this.left);
        clearInterval(this.up);
    }

    render() {
        return(
            <div className="arrow-key-container">
                <div className="arrow-key up" data-key="38" onMouseDown={this.handleClickUp} onMouseUp={this.handleChange}></div><br/>
                <div className="arrow-key left" data-key="37" onMouseDown={this.handleClickLeft} onMouseUp={this.handleChange}></div>
                <div className="arrow-key right" data-key="39" onMouseDown={this.handleClickRight} onMouseUp={this.handleChange}></div>
            </div>
        )
    }
}

export default Arrows;
