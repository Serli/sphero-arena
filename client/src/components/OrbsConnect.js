import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import {Button, ButtonToolbar, Row, Col} from 'react-bootstrap';

export class OrbsConnect extends Component {

    constructor(props) {
        super(props);
        this.state = {isToggleOffCOM6: false, isToggleOffCOM4: false, styleCOM4: '', styleCOM6:''};
        // This binding is necessary to make `this` work in the callback
        this.handleClickCOM4 = this.handleClickCOM4.bind(this);
        this.handleClickCOM6 = this.handleClickCOM6.bind(this);
    }

    handleClickCOM4(){
        this.props.history.push('/controls');
        this.props.socket.emit('connect orb', {port: 'COM7', color: 'green'});
        this.setState({
            isToggleOffCOM4: true,
            styleCOM4:'grey'
        })
    }

    handleClickCOM6(){
        this.props.history.push('/controls');
        this.props.socket.emit('connect orb', {port: 'COM9', color: 'gold'});
        this.setState({
            isToggleOffCOM6: true,
            styleCOM6:'grey'
        })
    }

    render() {
        return (
            <Row>
                <Col xs={2} sm={2} lg={2}>
                </Col>
                <Col xs={10} sm={10} lg={10}>
                    <div>
                        <div> Quelle orbe voulez vous connecter ? </div>
                        <ButtonToolbar>
                            <Button bsStyle="success" bsSize="large" onClick={this.handleClickCOM4} disabled={this.state.isToggleOffCOM4}>Com4</Button>
                            <Button bsStyle="warning" bsSize="large" onClick={this.handleClickCOM6} disabled={this.state.isToggleOffCOM6}>Com6</Button>
                        </ButtonToolbar>
                        {/*<button style={{backgroundColor:this.state.styleCOM4}} onClick={this.handleClickCOM4} id="orbCOM4" disabled={this.state.isToggleOffCOM4}>COM4 ORB</button>
                        <button style={{backgroundColor:this.state.styleCOM6}} onClick={this.handleClickCOM6} id="orbCOM6" disabled={this.state.isToggleOffCOM6}>COM6 ORB</button>
                        */}
                    </div>
                </Col>
            </Row>
        );
    }
}

export default withRouter(OrbsConnect);
