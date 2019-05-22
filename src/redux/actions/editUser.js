import axios from 'axios';

const editUserRequest = () => {
  return {
    type: "EDIT_USER_REQUEST"
  };
};

const editUserSuccess = () => {
  return {
    type: "EDIT_USER_SUCCESS"
  };
};

const editUserFail = (err) => {
  return {
    type: "EDIT_USER_FAIL",
    err: err
  };
};

export const editUserAction = (userInfo, callback) => {
  return (dispatch) => {
    dispatch(editUserRequest());
    axios.post("http://localhost:3010/app/edit", {
      id: userInfo.id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      gender: userInfo.gender,
      age: userInfo.age,
      password: userInfo.password
    })
    .then(res => {
      dispatch(editUserSuccess());
      callback();
    })
    .catch(err => {
      dispatch(editUserFail(err));
    });
  };
};