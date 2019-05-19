const initialState = {
  data: [],
  err: null,
  isLoading: false
};

const getUser = ( state = initialState, action) => {
  switch(action.type) {
    case "GET_USER_REQUEST":
      return {
        ...state,
        isLoading: true
      };
    case "GET_USER_SUCCESS":
      return {
        isLoading: false,
        data: action.data,
        err: null
      };
    case "GET_USER_FAIL":
      return {
        ...state,
        err: action.err,
        isLoading: false
      };
    default:
      return state;
  }
};

export default getUser;