import React, { Component } from 'react';


class Shoot extends Component {
    constructor(props){
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {

    }

    render() {
        return(
            <div>
                <button type="button" className="btn btn-default" id="shoot" onClick={this.handleClick} >
                    <span className="glyphicon glyphicon-screenshot"></span>
                </button>
            </div>
        )
    }
}

export default Shoot;