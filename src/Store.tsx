import { configureStore } from "@reduxjs/toolkit";
import jwtReducer from "./Slices/JwtSlices.tsx";
import userReducer from "./Slices/UserSlice.tsx";
export default configureStore({
    reducer:{
        jwt:jwtReducer,
        user:userReducer
    }
})