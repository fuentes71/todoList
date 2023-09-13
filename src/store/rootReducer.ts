import { combineReducers } from "@reduxjs/toolkit";
import { alertReducer } from "./modules/alertSlice";
import { tasksReducer } from "./modules/tasksSlice";
import { userReducer } from "./modules/userSlice";
export const rootReducer = combineReducers({
    user: userReducer,
    tasks: tasksReducer,
    alert: alertReducer,
});
export type RootState = ReturnType<typeof rootReducer>;