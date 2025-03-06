import axios from "axios";

export const loginUser = (userData) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", userData);
    
    const { token, user } = res.data; 
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    dispatch({ type: "LOGIN_SUCCESS", payload: user });

    return { success: true, user };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, error };
  }
};

export const signupUser = (userData) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/signup", userData);
    
    const { token, user } = res.data; 
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    dispatch({ type: "SIGNUP_SUCCESS", payload: user });

    return { success: true, user };
  } catch (error) {
    console.error("Signup Error:", error);
    return { success: false, error: error.response?.data?.message || "Signup failed" };
  }
};
