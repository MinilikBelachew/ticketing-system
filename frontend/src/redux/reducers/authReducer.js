const initialState = { user: null, token: null };

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload.user, token: action.payload.token };
    case "LOGOUT":
      return { user: null, token: null };
    default:
      return state;
  }
};
