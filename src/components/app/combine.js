import StopwatchSlice from "./sub/createStopwatch";
import uiSlice from './sub/createUi';
import { combineReducers } from "@reduxjs/toolkit";

const Combine = combineReducers({
    stopwatch: StopwatchSlice.reducer,
    ui: uiSlice.reducer
});

export default Combine;
export const StopwatchActions = StopwatchSlice.actions;
export const uiActions = uiSlice.actions;