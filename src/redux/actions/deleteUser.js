import axios from 'axios';
import { getUsersAction } from '../actions/getUsers';

const deleteUserRequest = () => {
  return {
    type: "DELETE_USER_REQUEST"
  };
};

const deleteUserSuccess = (id) => {
  return {
    type: "DELETE_USER_SUCCESS",
    id: id
  };
};

const deleteUserFail = (err) => {
  return {
    type: "DELETE_USER_FAIL",
    err: err
  };
};

export const deleteUserAction = (userId) => {
  return (dispatch) => {
    dispatch(deleteUserRequest());
    axios.delete(`http://localhost:3010/app/delete/${userId}`)
      .then(res => {
        dispatch(deleteUserSuccess(userId));
        dispatch(getUsersAction());
      })
      .catch(err => {
        dispatch(deleteUserFail(err));
      });
  };
};