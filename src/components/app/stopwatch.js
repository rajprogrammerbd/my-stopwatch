import StopwatchSlice from "./sub/createStopwatch";
import { combineReducers } from "@reduxjs/toolkit";

const stopwatchReducers = combineReducers({
    stopwatch: StopwatchSlice.reducer
});

export default stopwatchReducers;
export const StopwatchActions = StopwatchSlice.actions;