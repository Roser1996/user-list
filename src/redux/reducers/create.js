const initialState = {
  err: null,
  isLoading: false
};

const createUser = ( state = initialState, action) => {
  switch(action.type) {
    case "CREATE_USER_REQUEST":
      return {
        ...state,
        isLoading: true
      };
    case "CREATE_USER_SUCCESS":
      return {
        err: null,
        isLoading: false
      };
    case "CREATE_USER_FAIL":
      return {
        err: action.err,
        isLoading: false
      };
    default:
      return state;
  }
};

export default createUser;