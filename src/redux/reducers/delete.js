const initialState = {
  err: null,
  isLoading: false
};

const deleteUser = ( state = initialState, action) => {
  switch(action.type) {
    case "DELETE_USER_REQUEST":
      return {
        ...state,
        isLoading: true
      };
    case "DELETE_USER_SUCCESS":
      return {
        err: null,
        isLoading: false
      };
    case "DELETE_USER_FAIL": 
      return {
        err: action.err,
        isLoading: false
      };
    default:
      return state;
  }
};

export default deleteUser;