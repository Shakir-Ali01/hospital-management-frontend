import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

let initialState = {};
const token = localStorage.getItem("token");

if (token) {
  try {
    initialState = jwtDecode(token);
  } catch (error) {
    console.error("Invalid token in localStorage:", error);
    localStorage.removeItem("token");
    initialState = {};
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      try {
        const decoded = jwtDecode(action.payload);
        localStorage.setItem("token", action.payload);
        return decoded; // replace state with decoded claims
      } catch (error) {
        console.error("Invalid token:", error);
        return state;
      }
    },
    removeUser: () => {
      localStorage.removeItem("token");
      return {}; // reset state back to empty object
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
