import React,{ Component } from 'react';
import './EditUser.css';
import UserForm from '../UserForm/UserForm';

class EditUser extends Component {
  render() {
    return (
      <div className="total">
        <h1>Edit User</h1>
        <UserForm buttonText={"Save Changes"} />
      </div>
    )
  }
}

export default EditUser;