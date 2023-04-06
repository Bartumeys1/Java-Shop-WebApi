import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
//Reducers
import { AuthReducer } from "../components/auth/authReducers/authReducer";
import { RegistrateReducer } from "../components/auth/authReducers/registrationReducer";



export const rootReducer = combineReducers({
   auth: AuthReducer,
   registrate:RegistrateReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [thunk]
});