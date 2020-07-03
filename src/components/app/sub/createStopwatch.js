import { createSlice } from "@reduxjs/toolkit";

const StopwatchSlice = createSlice({
    name: "stopwatch",
    initialState: {
        active: false,
        time: ["00", "00", "00"],
        saved: [],
        savedCurrentLaps: []
    },
    reducers: {
        titleChanged: (state, action) => {
            state.savedCurrentLaps = state.savedCurrentLaps.map(obj => {
                if (obj.id === action.payload.first && obj.savedId === action.payload.last) {
                    obj.title = action.payload.title;
                }

                return obj;
            });
        },
        totalLapsChanges: (state, action) => {
            state.savedCurrentLaps = action.payload.lapsObj;
        },
        savedCurrentLaps: (state, action) => {
            state.savedCurrentLaps.push(action.payload.laps);
        },
        activeStopwatch: (state, action) => {
            state.active = true;
        },
        stopStopwatch: (state, action) => {
            state.active = false;
        },
        addTime: (state, action) => {
            state.time = action.payload.time;
        },
        addSaved: (state, action) => {
            state.saved.push({
                id: action.payload.id,
                totalTime: action.payload.totalTime,
                laps: action.payload.laps
            });
        },
        removedSaved: (state, action) => {
            state.saved = [];
        }
    }
});

export default StopwatchSlice;
