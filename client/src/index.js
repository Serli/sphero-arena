import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import OrbsConnect from "./OrbsConnect";
import Joystick from "./Joystick";
import Joystick2 from "./Joystick2";
import io from 'socket.io-client';
import FloorPlan from "./FloorPlan";

let socket = io();

let props = {socket:socket};

ReactDOM.render(React.createElement(OrbsConnect, props), document.getElementById('orbsConnect'));
ReactDOM.render(React.createElement(FloorPlan, props), document.getElementById('floorPlan'));
ReactDOM.render(React.createElement(Joystick, props), document.getElementById('joystick'));
ReactDOM.render(React.createElement(Joystick2, props), document.getElementById('joystick2'));