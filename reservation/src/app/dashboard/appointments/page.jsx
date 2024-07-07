"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const AppointmentsPage = () => {
  const [locationsArray, setLocationsArray] = useState([]);
  const [selected_location_id, setSelectedLocationId] = useState(null);
  const [appointmentsArray, setAppointmentsArray] = useState([]);
  const router = useRouter();

  const handleLoad = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/getAppointments",
        {
          params: { location_id: selected_location_id },
        }
      );
      
      setAppointmentsArray(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLocationChange = (e) => {
    const selectedId = e.target.value;
    setSelectedLocationId(selectedId);
    console.log("Selected Location ID:", selectedId);
    // Optionally, fetch appointments based on the selected location ID
    // getAppointmentsByLocation(selectedId);
  };

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getLocations");
        console.log(response.data.data);
        setLocationsArray(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getLocations();
  }, []);

  return (
    <div className="mx-auto">
      <h2>Appointments</h2>
      <div>
        <h3>Select Location</h3>
        <select
          name="location"
          id="location"
          className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={handleLocationChange}
        >
          {locationsArray.map((location) => (
            <option key={location.location_id} value={location.location_id}>
              {location.location_name}
            </option>
          ))}
        </select>
        <button onClick={() => handleLoad()}>Load</button>
      </div>
      <div>
        <table className="border-collapse table-auto">
          <thead>
            <tr>
              <th className="border border-slate-600">Title</th>
              <th className="border border-slate-600">Type</th>
              <th className="border border-slate-600">Time</th>
              <th className="border border-slate-600">Date</th>
              <th className="border border-slate-600">Current reservations</th>
              <th className="border border-slate-600">Max reservations</th>
              <th className="border border-slate-600">Duration</th>
              <th className="border border-slate-600">Status</th>
              <th className="border border-slate-600">X</th>
            </tr>
          </thead>
          <tbody>
            {appointmentsArray.map((appointment) => (
                <tr key={appointment.appointment_id} className="bg-slate-800 hover:bg-slate-600">
                    <td className="border border-slate-600">{appointment.appointment_title}</td>
                    <td className="border border-slate-600">{appointment.appointment_type}</td>
                    <td className="border border-slate-600">{appointment.appointment_time}</td>
                    <td className="border border-slate-600">{appointment.appointment_dates.join(', ')}</td>
                    <td className="border border-slate-600">{appointment.appointment_reservations}</td>
                    <td className="border border-slate-600">{appointment.appointment_max_reservations}</td>
                    <td className="border border-slate-600">{appointment.appointment_duration}</td>
                    <td className="border border-slate-600">{appointment.appointment_status}</td>
                    <td className="border border-slate-600"><Link href={{pathname:`/dashboard/appointments/${appointment.appointment_id}`, query: {id: JSON.stringify(appointment.appointment_id)} }}>Edit</Link></td>

                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsPage;
