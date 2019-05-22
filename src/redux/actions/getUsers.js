import axios from 'axios';

const getUserRequest = () => {
  return {
    type: "GET_USER_REQUEST"
  };
};

const getUserSuccess = (data) => {
  return {
    type: "GET_USER_SUCCESS",
    data: data
  };
};

const getUserFail = (err) => {
  return {
    type: "GET_USER_FAIL",
    err: err
  };
};

export const getUsersAction = (callback) => {
  return (dispatch) => {
    dispatch(getUserRequest());
    axios.get("http://localhost:3010/app/all")
      .then(res => {
        dispatch(getUserSuccess(res.data));
        callback();
      })
      .catch(err => {
        dispatch(getUserFail(err));
      });
  };
};