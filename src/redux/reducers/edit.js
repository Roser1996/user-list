const initialState = {
  err: null,
  isLoading: false
};

const editUser = ( state = initialState, action) => {
  switch(action.type) {
    case "EDIT_USER_REQUEST":
      return {
        ...state,
        isLoading: true
      };
    case "EDIT_USER_SUCCESS":
      return {
        err: null,
        isLoading: false
      };
    case "EDIT_USER_FAIL":
      return {
        err: action.err,
        isLoading: false
      };
    default: 
      return state;
  }
};

export default editUser;