'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startTimer, stopTimer, tick } from "@/lib/features/timer/timerSlice";


const Timer = () => {

    const dispatch = useDispatch();
    const {minutes, seconds, isRunning} = useSelector(state => state.timer)

    const ping =(minutes, seconds, isRunning)=> {
        if(minutes === 0 && seconds === 0) {
            alert("Time is up resetting reservation portal")
            dispatch(stopTimer(isRunning))
        }
    }

   useEffect(() => {

        let interval;
        dispatch(startTimer(isRunning))
        if (isRunning) {
            interval = setInterval(()=> {
                dispatch(tick());
            }, 1000)
        }
        ping(minutes, seconds, isRunning)
        

        return () => clearInterval(interval);
    }, [isRunning, dispatch]);
    


    return (
        <div className="px-1 py-1 bg-white text-black mx-auto max-w-20 text-center rounded-full">
            <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
        </div>
    )
}


export default Timer;