import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Tabs, Tab} from 'material-ui/Tabs';
import Demo from './Demo';
import Demotwo from './DemoTwo';
import Home from './../components/Home';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
         <Demo />
      </div>
    );
  }
}

export default App;