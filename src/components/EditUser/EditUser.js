import React,{ Component } from 'react';
import './EditUser.css';
import { withRouter } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';

class EditUser extends Component {
  componentDidMount() {
    // console.log(this.props.match.params);
  }
  render() {
    const props = this.props;
    return (
      <div className="total">
        <h1>Edit User</h1>
        <UserForm buttonText={"Save Changes"} {...props} id={this.props.match.params.id} />
      </div>
    )
  }
}

export default withRouter(EditUser);