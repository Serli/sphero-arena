import React, { Component } from 'react';


class Arrows extends Component {
    constructor(props){
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.handleClickUp = this.handleClickUp.bind(this);
        this.handleClickLeft = this.handleClickLeft.bind(this);
        this.handleClickDown = this.handleClickDown.bind(this);
        this.handleClickRight = this.handleClickRight.bind(this);
    }

    handleClickUp() {
        this.props.socket.emit('go forward');
    }

    handleClickLeft() {
        this.props.socket.emit('left');
    }

    handleClickDown() {
        this.props.socket.emit('stop');
    }

    handleClickRight() {
        this.props.socket.emit('right');
    }

    render() {
        return(

            <div className="arrow-key-container">
                <div className="arrow-key up" data-key="38" onClick={this.handleClickUp}></div><br/>
                <div className="arrow-key left" data-key="37" onClick={this.handleClickLeft}></div>
                <div className="arrow-key down" data-key="40" onClick={this.handleClickDown}>
                    <i className="glyphicon glyphicon-pause"></i>
                </div>
                <div className="arrow-key right" data-key="39" onClick={this.handleClickRight}></div>
            </div>
        )
    }
}

export default Arrows;
