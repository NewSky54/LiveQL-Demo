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
      // <Tabs contentContainerClassName="Navbar" onChange={this.handleCallToRouter}>
      //   <Tab label="Demo One" value="/">
          <div>
             <Demo />
          </div>
        /* </Tab>
        <Tab label="Demo Two" value="/two">
          <div>
            <Demotwo />
          </div>
        </Tab
      </Tabs>      */
  );
    // return (
    //   <Router>
    //     <div>
    //       <ul>
    //         <li>
    //           <Link to="/">Demo</Link>
    //         </li>
    //         <li>
    //           <Link to="/demo">Home</Link>
    //         </li>
    //       </ul>
    //       <Route exact path="/" component={Demo} />
    //       <Route path="/demo" component={Home} />
    //     </div>
    //   </Router>
    // );
  }
}

export default App;