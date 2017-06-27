import React, { Component } from 'react';


class Shoot extends Component {
    constructor(props){
        super(props);
        this.state = {shootPos: ''};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.socket.emit('shoot');
    }

    render() {
        return(
            <div>
                <button type="button" className="btn btn-default" id="shoot" onClick={this.handleClick} >
                    <span className="glyphicon glyphicon-screenshot" />
                </button>
            </div>
        )
    }
}

export default Shoot;