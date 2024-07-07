import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reservation_location: '',
    reservation_date: '',
    reservation_time: '',
    reservation_type: '',
    reservation_duration: '',
    reservation_given_name: '',
    reservation_surname: '',
    reservation_phone_number: '',
    reservation_zipcode: '',
}
const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.reservation_location = action.payload
        },

        setDate: (state, action ) => {
            state.reservation_date = action.payload
        },

        setTime:(state,action ) => {
            state.reservation_time = action.payload
        },

        setType: (state, action)=> {
            state.reservation_type = action.payload
        },

        setDuration: (state, action)=> {
            state.reservation_duration = action.payload
        },
        setGivenName: (state, action) => {
            state.reservation_given_name = action.payload
        },
        setSurname: (state,action)=> {
            state.reservation_surname = action.payload
        },
        setPhoneNumber: (state, action)=> {
            state.reservation_phone_number = action.payload
        },
        setZipcode: (state, action) => {
            state.reservation_zipcode = action.payload
        }
        
    }
})

export const {
    setLocation,
    setDate,
    setTime,
    setType,
    setDuration,
    setGivenName,
    setSurname,
    setPhoneNumber,
    setZipcode,
} = reservationSlice.actions;
export default reservationSlice.reducer;