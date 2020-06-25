import stopwatchReducers, { StopwatchActions } from "./stopwatch";
import { configureStore } from "@reduxjs/toolkit";

const stopwatchStore = configureStore({
    reducer: stopwatchReducers
});

export default stopwatchStore;
export const stopwatch_action = StopwatchActions;