"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppointmentSelectionStatus } from "@/lib/features/global/globalSlice";
import axios from "axios";
import {
  setLocation,
  setDate,
  setTime,
  setType,
  setDuration,
} from "@/lib/features/reservation/reservationSlice";
import Calendar from "react-calendar";
import Link from "next/link";

const Calendar_ = ({ location_arr }) => {
  const [showAppointments, setShowAppointments] = useState(false);
  const [exception_dates, setExceptionDates] = useState([]);
  const [isOnDay, setIsOnDay] = useState();
  const [selected_location_id, set_selected_location_id] = useState(null);
  const [selected_location_name, set_selected_location_name] = useState(null);
  const [chosenDay, setChosenDay] = useState(null);
  const [location_index, set_location_index] = useState(null);
  const [isBookingSelected, setIsBookingSelected] = useState(false);
  const [appointment_arr, setAppointmentArr] = useState([]);
  const dispatch = useDispatch();

  //utility functions
  const manipulateObJToString = (object) => {
    const string = object.toString();
    return string;
  };

  const splitArrBySpaces = (array) => {
    const splitArray = array.split(" ");
    return splitArray;
  };

  //first stage select location
  const handleLocationSelection = async (location) => {
    await set_selected_location_id(location.location_id);
    await set_selected_location_name(location.location_name);
    console.log(location);
    await setExceptionDates(location.exception_dates);
    try {
      const response = await axios.get(
        "http://localhost:5000/getAppointments",
        {
          params: { location_id: location.location_id },
        }
      );
      await setAppointmentArr(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAppointmentRefresh = async (location_id) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/getAppointments",
        {
          params: { location_id },
        }
      );
      console.log(response.data.data);
      setAppointmentArr(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkDay = (weekday, appointment_arr) => {
    for (let i = 0; i < appointment_arr.length; i++) {
      let appointment_dates = appointment_arr[i].appointment_dates;
      return appointment_dates.includes(weekday);
    }
  };
  const checkExceptionDates = (weekday, exception_dates) => {
    return exception_dates.includes(weekday);
  };

  const onChange = (date_value) => {
    const x = manipulateObJToString(date_value);

    let date_arr = splitArrBySpaces(x);
    const dayOFWeek = date_arr[0];
    const weekday = date_arr[1] + " " + date_arr[2];
    const date =
      dayOFWeek + " " + date_arr[1] + " " + date_arr[2] + " " + date_arr[3];
    setChosenDay(date);
    const e_date_match = checkExceptionDates(weekday, exception_dates);
    if (e_date_match === true) {
      // no appointments on this day
      setIsOnDay(false);
      return;
    }
    const matched = checkDay(dayOFWeek, appointment_arr);

    setIsOnDay(matched);
    setShowAppointments(true);
  };
  const handleBooking = (appointment_arr, appointment_id) => {
    const appointment = appointment_arr.find(
      (app) => app.appointment_id === appointment_id
    );
    console.log(appointment);
    const { appointment_time, appointment_duration, appointment_type } =
      appointment;
    dispatch(setLocation(selected_location_name));
    dispatch(setDate(chosenDay));
    dispatch(setTime(appointment_time));
    dispatch(setType(appointment_type));
    dispatch(setDuration(appointment_duration));
    setIsBookingSelected(true);
    console.log("Confirming booking proceeding!");
  };
  const handleSuccessfullBooking = () => {
    console.log("Successful booking");
    dispatch(setAppointmentSelectionStatus(true));
  };

  useEffect(() => {}, []);
  return (
    <div>
      <h2 className={"text-center my-3 mx-auto"}>
        Select your preferred location
      </h2>
      <div
        className={
          "border-2 border-white text-center mx-20 my-4 px-5 py-2 flex flex-row"
        }
      >
        {location_arr.map((location) => (
          <div
            key={location.location_id}
            onClick={() => handleLocationSelection(location)}
            className={
              "border-2 border-white  max-w-60 mx-auto my-1 px-2 py-2 rounded-sm justify-center hover:bg-blue-400 hover:text-black hover:border-rose-50 hover:border-2 hover:cursor-pointer"
            }
          >
            {location.location_name}
          </div>
        ))}
      </div>
      <p className={"text-center my-3 mx-auto"}>
        Showing appointments for {selected_location_name}
      </p>
      <button
        onClick={() => handleAppointmentRefresh(selected_location_id)}
        className={
          "bg-black text-sky-600 block text-center max-w-48 mx-auto my-5 px-4 py-2 border-2 border-blue-400 rounded-md hover:bg-blue-400 hover:text-black hover:border-rose-50 hover:border-2 hover:cursor-pointer"
        }
      >
        Refresh
      </button>
      <p className={"text-center my-1 mx-auto"}>
        To refresh appointments click refresh
      </p>
      <Calendar
        onChange={onChange}
        value={new Date()}
        className={"mx-20 border-2 border-white px-5 py-2"}
      />
      {showAppointments &&
        (isOnDay ? (
          <div>
            {appointment_arr.map((appointment) => (
              <div
                key={appointment.appointment_id}
                className={"border-white border-2 mx-20 my-2 py-3 px-3"}
              >
                <h4>{appointment.appointment_title}</h4>
                <span>Time: {appointment.appointment_time}</span>&nbsp;&nbsp;
                <span>Duration: ~{appointment.appointment_duration}</span>
                <p>Appointment Type: {appointment.appointment_type}</p>
                {appointment.appointment_dates.map((date, index) => (
                  <p key={index}>{date}</p>
                ))}
                <p className={"text-right"}>
                  Spots Filled: {appointment.appointment_reservations}/
                  {appointment.appointment_max_reservations}
                </p>
                <button
                  disabled={
                    appointment.appointment_reservations ===
                    appointment.appointment_max_reservations
                  }
                  onClick={() =>
                    handleBooking(appointment_arr, appointment.appointment_id)
                  }
                  className={
                    appointment.appointment_reservations !==
                    appointment.appointment_max_reservations
                      ? "bg-black text-sky-600 block text-center max-w-48   my-2 px-1 py-.5 border-2 border-blue-400 rounded-lg hover:bg-blue-400 hover:text-black hover:border-rose-50 hover:border-2 hover:cursor-pointer"
                      : "bg-black text-sky-600 block text-center max-w-48   my-2 px-1 py-.5 border-2 border-blue-400 rounded-lg"
                  }
                >
                  Reserve
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={"border-2 border-white text-center mx-20 my-4 px-5 py-2"}
          >
            <p>No Appointments Available!</p>
          </div>
        ))}
      <Link href={"/reservation"}>
        <button
          disabled={!isBookingSelected}
          onClick={handleSuccessfullBooking}
          className={
            "bg-black text-sky-600 block text-center max-w-48 mx-20 my-5 px-4 py-2 border-2 border-blue-400 rounded-md hover:bg-blue-400 hover:text-black hover:border-rose-50 hover:border-2 hover:cursor-pointer"
          }
        >
          Proceed
        </button>
      </Link>
    </div>
  );
};

export default Calendar_;
