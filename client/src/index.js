import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import OrbsConnect from "./components/OrbsConnect";
import Joystick from "./components/Joystick";
import Shoot from "./components/Shoot";
import Exception from "./components/Exception";
import io from 'socket.io-client';
import FloorPlan from "./components/FloorPlan";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Col,
    Row,
    Navbar,
    NavItem,
    Nav
} from 'react-bootstrap'




let socket = io();

const BasicExample = () => (
    <Router>
        <div>
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Sphero Arena</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="/connect">
                            <Link to="/connect">Orbs connection</Link> {/*LinkContainer ?*/}
                        </NavItem>
                        <NavItem eventKey={2} href="/FloorPlan">
                            <Link to="/FloorPlan">FloorPlan</Link>
                        </NavItem>
                        <NavItem eventKey={3} href="/controls">
                            <Link to="/controls">Controls</Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Exception socket={socket}/>


            <Route exact path='/FloorPlan' component={() => (
                <FloorPlan socket={socket}/>
            )}/>
            <Route exact path='/connect' component={() => (
                <OrbsConnect socket={socket}/>
            )}/>
            <Route exact path='/controls' component={() => (
                <Row>
                    <Col xs={8} sm={8} lg={8}>
                        <Joystick socket={socket}/>
                    </Col>
                    <Col xs={4} sm={4} lg={4}>
                        <Shoot socket={socket}/>
                    </Col>
                </Row>
            )}/>
        </div>
    </Router>
);

ReactDOM.render(React.createElement(BasicExample), document.getElementById('basic'));




