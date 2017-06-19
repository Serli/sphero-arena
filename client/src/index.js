import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import Basic from './basic';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Toggle} from "./toggle";
import LeftArrow from "./LeftArrow";

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Toggle />, document.getElementById('toggle'));
ReactDOM.render(<LeftArrow />, document.getElementById('leftArrow'));
//ReactDOM.render(<Basic />, document.getElementById('basic'));