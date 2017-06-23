import React, { Component } from 'react';

class OrbsConnect extends Component {

    constructor(props) {
        super(props);
        this.state = {isToggleOffCOM6: false, isToggleOffCOM4: false, style: ''};
        
        // This binding is necessary to make `this` work in the callback
        this.handleClickCOM4 = this.handleClickCOM4.bind(this);
        this.handleClickCOM6 = this.handleClickCOM6.bind(this);
    }

    componentDidMount() {

    }

    handleClickCOM4(){
        this.props.socket.emit('connect orb', 'COM4');
        this.setState({
            isToggleOffCOM4: true,
            style:'grey'
        })
    }

    handleClickCOM6(){
        this.props.socket.emit('connect orb', 'COM6');
        this.setState({
            isToggleOffCOM6: true,
            style:'blue'
        })
    }

    render() {
        return (
            <div>
                <button style={{backgroundColor:this.state.style}} onClick={this.handleClickCOM4} id="orbCOM4" disabled={this.state.isToggleOffCOM4}>COM4 ORB</button>
                <button onClick={this.handleClickCOM6} id="orbCOM6" disabled={this.state.isToggleOffCOM6}>COM6 ORB</button>
            </div>
        );
    }
}

export default OrbsConnect;