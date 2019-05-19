import React, { Component } from 'react';
import './CreateUser.css';
import { withRouter } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';

class CreateUser extends Component {
  render() {
    const props = this.props;
    return (
      <div className="total">
        <h1>Create New User</h1>
        <UserForm buttonText={"Add User"} {...props}/>
      </div>
    )
  }
}

export default withRouter(CreateUser);