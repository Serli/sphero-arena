import React, { Component } from 'react';


class FloorPlan extends Component {
    constructor(props){
        super(props);
        this.state = {xpos: '0', ypos:'0'};
        props.socket.on('xpos', (data) => this.updateXInState(data));
        props.socket.on('ypos', (data) => this.updateYInState(data));
    }

    updateXInState(data) {
        this.setState({
            xpos: data
        })
    }

    updateYInState(data) {
        this.setState({
            ypos: data
        })
    }

    render() {
        return(
            <div>
                <p>posx : {this.state.xpos}</p>
                <p>posy : {this.state.ypos}</p>
            </div>
        )
    }
}

export default FloorPlan;
