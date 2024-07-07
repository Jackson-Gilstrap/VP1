import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        seconds: 0,
        minutes: 1,
        isRunning: false,
    },
    reducers: {
        startTimer: (state) => {
            state.isRunning = true
        },
        stopTimer: (state) => {
            state.isRunning = false
        },

        tick: (state) => {

            if (state.seconds === 0) {
                if (state.minutes === 0) {
                    state.isRunning = false;
                } else {
                    state.seconds = 59;
                    state.minutes -= 1;
                }

            } else {
                state.seconds -= 1;
            }
        }

        


    }
})

export const { startTimer, stopTimer, tick}= timerSlice.actions;
export default timerSlice.reducer