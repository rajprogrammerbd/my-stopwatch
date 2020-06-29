import Combine, { StopwatchActions, uiActions } from "./combine";
import { configureStore } from "@reduxjs/toolkit";

const totalReducer = configureStore({
    reducer: Combine
});

export default totalReducer;
export const stopwatch_action = StopwatchActions;
export const uiAction = uiActions;