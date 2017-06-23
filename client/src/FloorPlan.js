import React, { Component } from 'react';


class FloorPlan extends Component {
    constructor(props){
        super(props);
        this.state = {xposCOM4: '0', yposCOM4:'0', xposCOM6:'0', yposCOM6:'0'};
        props.socket.on('xposCOM4', (data) => this.updateXCOM4InState(data));
        props.socket.on('yposCOM4', (data) => this.updateYCOM4InState(data));
        props.socket.on('xposCOM6', (data) => this.updateXCOM6InState(data));
        props.socket.on('yposCOM6', (data) => this.updateYCOM6InState(data));
    }

    updateXCOM4InState(data) {
        this.setState({
            xposCOM4: data
        })
    }

    updateYCOM4InState(data) {
        this.setState({
            yposCOM4: data
        })
    }

    updateXCOM6InState(data) {
        this.setState({
            xposCOM6: data
        })
    }

    updateYCOM6InState(data) {
        this.setState({
            yposCOM6: data
        })
    }

    render() {
        return(
            <div>
                <p>posxCOM4 : {this.state.xposCOM4}</p>
                <p>posyCOM4 : {this.state.yposCOM4}</p>
                <p>posxCOM6 : {this.state.xposCOM6}</p>
                <p>posyCOM6 : {this.state.yposCOM6}</p>
            </div>
        )
    }
}

export default FloorPlan;
