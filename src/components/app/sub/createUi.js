import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: "ui",
    initialState: { sidebarOpen: false },
    reducers: {
        sidebarOpens: (state, action) => {
            state.sidebarOpen = action.payload.status;
        },
        sidebarClosed: (state, action) => {
            state.sidebarOpen = action.payload.status;
        }
    }
});

export default uiSlice;