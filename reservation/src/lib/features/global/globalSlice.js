import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
    name:'global',
    initialState: {
        completedQuestionnaire: false,
        completedAppointmentSelection: false,
        completedClientDetails: false,
        completedReminders: false,
        isloggedin: false,
    },

    reducers: {
        setQuestionnaireStatus: (state,action) => {
            state.completedQuestionnaire = action.payload;
        },

        setAppointmentSelectionStatus: (state, action) => {
            state.completedAppointmentSelection = action.payload;
        },

        setClientDetailsStatus: (state, action) => {
            state.completedClientDetails = action.payload;
        },

        setReminderStatus: (state,action) => {
            state.completedReminders = action.payload;
        },

        setIsLoggedIn: (state, action) => {
            state.isloggedin = action.payload
        }
    }
})


export const {
    setQuestionnaireStatus,
    setAppointmentSelectionStatus,
    setClientDetailsStatus,
    setReminderStatus,
    setIsLoggedIn,
} = globalSlice.actions

export default globalSlice.reducer;