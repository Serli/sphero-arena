import React, { Component } from 'react';


class FloorPlan extends Component {
    constructor(props){
        super(props);
        this.state = {xposCOM4: '0', yposCOM4:'0', xposCOM6:'0', yposCOM6:'0', shootPosX: '0', shootPosY:'0'};
        this.x=0;
        this.y=0;
        props.socket.on('xposCOM4', (data) => this.updateXCOM4InState(data));
        props.socket.on('yposCOM4', (data) => this.updateYCOM4InState(data));
        props.socket.on('xposCOM6', (data) => this.updateXCOM6InState(data));
        props.socket.on('yposCOM6', (data) => this.updateYCOM6InState(data));
        props.socket.on('shoot', (data) => this.updateShoot(data));

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

    updateShoot(data) {

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
        ctx.beginPath();
        ctx.arc(250, 250, 20, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#d5d5d5';
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(250,250);
        ctx.lineTo(250-parseInt(this.state.xposCOM4, 10), 250-parseInt(this.state.yposCOM4, 10));
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(750, 250, 20, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#d5d5d5';
        ctx.stroke();
        setTimeout(this.draw, 100);

        ctx.beginPath();
        ctx.moveTo(parseInt(this.state.xposCOM4, 10), parseInt(this.state.xposCOM4, 10));
        ctx.lineTo(20+parseInt(this.state.xposCOM4, 10), 20+parseInt(this.state.yposCOM4, 10));
        ctx.stroke();
    };

    render() {
        return(
            <div>
                <p>posxCOM4 : {this.state.xposCOM4}</p>
                <p>posyCOM4 : {this.state.yposCOM4}</p>
                <p>posxCOM6 : {this.state.xposCOM6}</p>
                <p>posyCOM6 : {this.state.yposCOM6}</p>
                <canvas style={{border: "1px solid #000000"}} width="1000" height="500" ref={ref => this.canvasRef = ref} />
            </div>
        )
    }
}

export default FloorPlan;
