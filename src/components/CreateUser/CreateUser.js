import React, { Component } from 'react';
import './CreateUser.css';
import UserForm from '../UserForm/UserForm';

class CreateUser extends Component {
  render() {
    return (
      <div className="total">
        <h1>Create New User</h1>
        <UserForm buttonText={"Add User"} />
      </div>
    )
  }
}

export default CreateUser;