"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Location = () => {
  const [appointmentData, setAppointmentData] = useState(null);
  const [formData, setFormData] = useState({
    appointment_title: "",
    appointment_type: "",
    appointment_time: "",
    appointment_date: "",
    appointment_reservations: "",
    appointment_max_reservations: "",
    appointment_duration: "",
    appointment_status: "",
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  useEffect(() => {
    const getAppointmentById = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/getAppointment/${id}`);
            setAppointmentData(response.data.data);
            console.log(response.data.data)

            setFormData({
                appointment_title: response.data.data.appointment_title,
                appointment_type: response.data.data.appointment_type,
                appointment_time: response.data.data.appointment_time,
                appointment_dates: response.data.data.appointment_dates,
                appointment_reservations: response.data.data.appointment_reservations,
                appointment_max_reservations: response.data.data.appointment_max_reservations,
                appointment_duration: response.data.data.appointment_duration,
                appointment_status: response.data.data.appointment_status,
              });
        } catch (error) {
            console.error(error)
        }
    }

    if(id) {
        getAppointmentById()
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/updateAppointment/${id}`,
        formData
      );
      console.log(response.data.data);
      router.back();
      // Optionally, you can set a success message or handle redirection after update
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto mt-5 bg-gray-200 p-6 rounded-lg shadow-md">
      <h2 className="text-center text-xl text-black font-bold mb-4">
        Edit Appointment
      </h2>
      {appointmentData ? (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="appointment_title"
              className="block text-sm font-medium text-gray-700"
            >
              Appointment Title:
            </label>
            <input
              type="text"
              id="appointment_title"
              name="appointment_title"
              value={formData.appointment_title}
              onChange={handleInputChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="appointment_type"
              className="block text-sm font-medium text-gray-700"
            >
              Type:
            </label>
            <input
              type="text"
              id="appointment_type"
              name="appointment_type"
              value={formData.appointment_type}
              onChange={handleInputChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="appointment_time"
              className="block text-sm font-medium text-gray-700"
            >
              Time:
            </label>
            <input
              type="text"
              id="appointment_time"
              name="appointment_time"
              value={formData.appointment_time}
              onChange={handleInputChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="appointment_dates"
              className="block text-sm font-medium text-gray-700"
            >
              Dates:
            </label>
            <input
              type="text"
              id="appointment_dates"
              name="appointment_dates"
              value={formData.appointment_dates}
              onChange={handleInputChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="appointment_status"
              className="block text-sm font-medium text-gray-700"
            >
             Status:
            </label>
            <input
              type="text"
              id="appointment_status"
              name="appointment_status"
              value={formData.appointment_status}
              onChange={handleInputChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="appointment_reservations"
              className="block text-sm font-medium text-gray-700"
            >
              Current Reservations:
            </label>
            <input
              type="text"
              id="appointment_reservations"
              name="appointment_reservations"
              value={formData.appointment_reservations} // Display as comma-separated string
              onChange={handleInputChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="appointment_max_reservations"
              className="block text-sm font-medium text-gray-700"
            >
              Max Reservations:
            </label>
            <input
              type="text"
              id="appointment_max_reservations"
              name="appointment_max_reservations"
              value={formData.appointment_max_reservations} // Display as comma-separated string
              onChange={handleInputChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="appointment_duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration:
            </label>
            <input
              type="text"
              id="appointment_duration"
              name="appointment_duration"
              value={formData.appointment_duration} // Display as comma-separated string
              onChange={handleInputChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Appointment
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Location;
