
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "SIGNUP_SUCCESS":
      return { 
        ...state, 
        user: action.payload, 
        token: localStorage.getItem("token") 
      };
    case "LOGOUT":
      return { user: null, token: null };
    default:
      return state;
  }
};
