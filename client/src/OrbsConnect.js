import React, { Component } from 'react';

class OrbsConnect extends Component {

    constructor(props) {
        super(props);
        this.state = {isToggleOff: false};

        props.socket.on('test', function (msg) {
            console.log('hello world!', msg);
        });

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {

    }

    handleClick(){
        this.props.socket.emit('connect orb', 'COM4');
        this.setState({
            isToggleOff: true
        })
    }

    render() {
        return (
            <div>
                <input onClick={this.handleClick} id="orbCOM4" value="COM4 ORB" disabled={this.state.isToggleOff}/>
            </div>
        );
    }
}

export default OrbsConnect;