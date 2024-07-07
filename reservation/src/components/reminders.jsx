"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { clients } from "@/app/reservation/reminders/clients";
import { useSelector, useDispatch } from "react-redux";
import { setReminderStatus } from "@/lib/features/global/globalSlice";
import GeneralReminders from "./generalReminders";

const Reminders = () => {
  const [is_found_in_db, setIsFoundInDb] = useState(false);
  const [is_checked, setIsChecked]= useState()
  const reservation = useSelector((state) => state.reservation);
  const dispatch = useDispatch();


  //returns a new array
  const findClient = () => {
    let client_array = clients.filter(client => client.surname === reservation.reservation_surname && client.phone_number === reservation.reservation_phone_number && client.zipcode === reservation.reservation_zipcode )
    return client_array
  }

  const handleReminderStatus = () => {
    dispatch(setReminderStatus(true))
  }

  const handleChange = (e) => {
    setIsChecked(e.target.checked)
    console.log(is_checked)
  }

  useEffect(()=> {
    const client = findClient()
    if (client.length === 1) {
        setIsFoundInDb(true)
    } else if (client.length === 0) {
        setIsFoundInDb(false)
    }

  },[])

  
  return (
    <>
      <div className="max-w-2xl mx-auto px-4-py-8">
        {is_found_in_db ? (
          <h2 className="text-3xl font-bold text-gray-400">
            Welcome back {reservation.reservation_given_name}
          </h2>
        ) : (
          <h2 className="text-3xl font-bold text-gray-400">
            Welcome {reservation.reservation_given_name}
          </h2>
        )}
        {is_found_in_db ? (
          <p className="mt-4 text-lg text-gray-500">
            Based on your last visit we suggest you bring the following...
          </p>
        ) : (
          <p className="mt-4 text-lg text-gray-500">
            Since this is your first time here are some general reminders for
            your first appointment with us.
          </p>
        )}
      </div>
      <GeneralReminders />
      <div>
        <input type="checkbox" name="confirm" id="confirm" onChange={handleChange} />
        <span>I have Acknowledge the reminders</span>
      </div>
      {is_checked && (<Link href={'/reservation'}><button onClick={handleReminderStatus}>Proceed</button></Link>)}
    </>
  );
};

export default Reminders;
