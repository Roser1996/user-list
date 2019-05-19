import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import CreateUser from './components/CreateUser/CreateUser';
import EditUser from './components/EditUser/EditUser';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const style = {
  tabs: {
    color: '#fff',
  },
};

class App extends Component {
  render() {
    return (
      <div>
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
