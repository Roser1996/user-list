import axios from 'axios';
import { getUsersAction } from '../../redux/actions/getUsers';

const createUserRequest = () => {
  return {
    type: "CREATE_USER_REQUEST"
  };
};

const createUserSuccess = () => {
  return {
    type: "CREATE_USER_SUCCESS"
  };
};

const createUserFail = (err) => {
  return {
    type: "CREATE_USER_FAIL",
    err: err
  };
};

export const createUserAction = (userInfo) => {
  return (dispatch) => {
    dispatch(createUserRequest());
    axios.post("http://localhost:3010/app/insert", {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      gender: userInfo.gender,
      age: userInfo.age,
      password: userInfo.password
    })
    .then(res => {
      dispatch(createUserSuccess());
      dispatch(getUsersAction());
    })
    .catch(err => {
      dispatch(createUserFail(err));
    });
  };
};