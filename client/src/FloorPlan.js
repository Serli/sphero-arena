import React, { Component } from 'react';


class FloorPlan extends Component {
    constructor(props){
        super(props);
        this.state = {xposCOM4: '0', yposCOM4:'0', xposCOM6:'0', yposCOM6:'0', shootPosX: '0', shootPosY:'0', shot: false};
        this.x=0;
        this.y=0;
        this.increment = 0;
        props.socket.on('xposCOM4', (data) => this.updateXCOM4InState(data));
        props.socket.on('yposCOM4', (data) => this.updateYCOM4InState(data));
        props.socket.on('xposCOM6', (data) => this.updateXCOM6InState(data));
        props.socket.on('yposCOM6', (data) => this.updateYCOM6InState(data));
        props.socket.on('shoot received', (data) => this.updateShoot(data));

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
        //need to pass which orb shot
        console.log('someone shoot');
        this.setState({
            shot: true
        })
    }

    componentDidMount(){
        this.draw();
    }

    draw = () => {
        const ctx = this.canvasRef.getContext("2d");

        //draw X and Y pos of orbs
        ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.font = "30px Arial";
        ctx.fillText(this.state.xposCOM4,10,50);
        ctx.fillText(this.state.yposCOM4,10,100);
        ctx.fillText(this.state.xposCOM6,10,150);
        ctx.fillText(this.state.yposCOM6,10,200);

        ctx.fillText(this.increment,10,250);


        //COM4 Green orb
        ctx.beginPath();
        ctx.arc(250, 250, 20, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#d5d5d5';
        ctx.stroke();

        //COM4 path drawing line of orb movement
        ctx.beginPath();
        ctx.moveTo(250,250);
        ctx.lineTo( 250 + parseInt(this.state.yposCOM4, 10), 250 +parseInt(this.state.xposCOM4, 10));
        ctx.stroke();

        //COM6 path drawing orb moving on canvas
        ctx.beginPath();
        ctx.arc(750 - parseInt(this.state.yposCOM6, 10), 250 + parseInt(this.state.xposCOM6, 10), 20, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#d5d5d5';
        ctx.stroke();

        console.log(this.state.shot);

        //shoot
        if(this.state.shot){
            if(this.increment < this.canvasRef.width-250){
                this.increment+=10;
                ctx.beginPath();
                /*
                ctx.moveTo(this.increment + parseInt(this.state.xposCOM4, 10), this.increment + parseInt(this.state.xposCOM4, 10));
                ctx.lineTo(this.increment + 20+parseInt(this.state.xposCOM4, 10), this.increment + 20+parseInt(this.state.yposCOM4, 10));
                */
                ctx.moveTo(this.increment+250, 250);
                ctx.lineTo(this.increment + 300, 250);

                ctx.stroke();
            }else{
                this.setState({
                    shot: false,
                });
                this.increment = 0;
            }
        }

        setTimeout(this.draw, 100);
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
