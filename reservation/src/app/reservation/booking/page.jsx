"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Calendar_ from "../Calendar";
import axios from "axios";

const BookingPage = () => {
  const [locationsArray, setLocationsArray] = useState([]);

  
  useEffect(() => {
    const getLocations = async () => {
      const response = await axios.get("http://localhost:5000/getLocations");
      setLocationsArray(response.data.data)
    };
    getLocations()
    
  }, []);

  return (
    <>
      <Link href={"/"}>
        <div
          className={
            "border-2 border-white rounded-md px-4 py-2 mx-5 my-4 max-w-48"
          }
        >
          <h3>Return Home &lt;--</h3>
        </div>
      </Link>
      <Calendar_ location_arr={locationsArray} />
    </>
  );
};

export default BookingPage;
