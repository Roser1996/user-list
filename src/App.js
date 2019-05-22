import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import CreateUser from './components/CreateUser/CreateUser';
import EditUser from './components/EditUser/EditUser';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Particles from 'react-particles-js';

const style = {
  tabs: {
    color: '#fff',
  },
};

const params = {
  "particles": {
    "number": {
      "value": 100
    },
    "size": {
      "value": 3
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
          "enable": true,
          "mode": "repulse"
      }
    }
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Particles className="particles" params={params} />
        <BrowserRouter>
          <AppBar position="static">
            <Tabs>
              <Link to="/" className="link">
                <Tab 
                  label="Home" 
                  style={style.tabs}
                />
              </Link>
            </Tabs>
          </AppBar>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/create" component={CreateUser} />
            <Route exact path="/edit/:id" component={EditUser} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
