import React, { Component } from 'react';

class OrbsConnect extends Component {

    constructor(props) {
        super(props);
        this.state = {isToggleOffCOM6: false, isToggleOffCOM4: false, styleCOM4: '', styleCOM6:''};
        // This binding is necessary to make `this` work in the callback
        this.handleClickCOM4 = this.handleClickCOM4.bind(this);
        this.handleClickCOM6 = this.handleClickCOM6.bind(this);
    }

    handleClickCOM4(){
        this.props.socket.emit('connect orb', {port: 'COM4', color: 'green'});
        this.setState({
            isToggleOffCOM4: true,
            styleCOM4:'grey'
        })
    }

    handleClickCOM6(){
        this.props.socket.emit('connect orb', {port: 'COM6', color: 'gold'});
        this.setState({
            isToggleOffCOM6: true,
            styleCOM6:'grey'
        })
    }

    render() {
        return (
            <div>
                <button style={{backgroundColor:this.state.styleCOM4}} onClick={this.handleClickCOM4} id="orbCOM4" disabled={this.state.isToggleOffCOM4}>COM4 ORB</button>
                <button style={{backgroundColor:this.state.styleCOM6}} onClick={this.handleClickCOM6} id="orbCOM6" disabled={this.state.isToggleOffCOM6}>COM6 ORB</button>
            </div>
        );
    }
}

export default OrbsConnect;