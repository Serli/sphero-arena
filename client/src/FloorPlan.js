import React, { Component } from 'react';


class FloorPlan extends Component {
    constructor(props){
        super(props);
        this.state = {xposCOM4: '0', yposCOM4:'0', xposCOM6:'0', yposCOM6:'0'};
        this.text = 'Salut';
        this.x=0;
        this.y=0;
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

    componentDidMount(){
        this.draw();
    }

    draw = () => {
        const ctx = this.canvasRef.getContext("2d");
        this.x = this.x + 2;
        this.y = this.y + 4;
        if (this.y > this.canvasRef.height) {
            this.x = 0;
            this.y = 0;
        }
        ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.font = "30px Arial";
        ctx.fillText(this.state.xposCOM4,10,50);
        ctx.fillText(this.state.yposCOM4,10,100);
        ctx.fillText(this.state.xposCOM6,10,150);
        ctx.fillText(this.state.yposCOM6,10,200);
        ctx.fillRect(10,10,1,1);
        setTimeout(this.draw, 100);
    };

    render() {
        return(
            <div>
                <p>posxCOM4 : {this.state.xposCOM4}</p>
                <p>posyCOM4 : {this.state.yposCOM4}</p>
                <p>posxCOM6 : {this.state.xposCOM6}</p>
                <p>posyCOM6 : {this.state.yposCOM6}</p>
                <canvas width="500" height="500" ref={ref => this.canvasRef = ref} />
            </div>
        )
    }
}

export default FloorPlan;
