import { configureStore } from "@reduxjs/toolkit";
import globalReducer from './features/global/globalSlice';
import timerReducer from './features/timer/timerSlice';
import userReducer from './features/user/userSlice';
import reservationReducer from'./features/reservation/reservationSlice';
export const makeStore = ()=> {
    return configureStore({

        reducer: {
            global: globalReducer,
            timer: timerReducer,
            reservation: reservationReducer,
            user: userReducer,
        },
    })
}