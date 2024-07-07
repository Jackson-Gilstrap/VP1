"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Location = () => {
  const [locationData, setLocationData] = useState(null);
  const [formData, setFormData] = useState({
    location_name: "",
    location_street_address: "",
    location_city: "",
    location_state: "",
    location_zipcode: "",
    exception_dates: [],
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  useEffect(() => {
    const getLocationByID = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/getLocation/${id}`
        );
        setLocationData(response.data.data);
        // Set form data with fetched location data
        setFormData({
          location_name: response.data.data.location_name,
          location_street_address: response.data.data.location_street_address,
          location_city: response.data.data.location_city,
          location_state: response.data.data.location_state,
          location_zipcode: response.data.data.location_zipcode,
          exception_dates: response.data.data.exception_dates,
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      getLocationByID();
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
      // Update location data on the server
      const response = await axios.put(
        `http://localhost:5000/api/updateLocation/${id}`,
        formData
      );
      console.log(response.data.data);
      router.back()
      // Optionally, you can set a success message or handle redirection after update
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto mt-5 bg-gray-200 p-6 rounded-lg shadow-md">
        <h2 className="text-center text-xl text-black font-bold mb-4">Edit Location</h2>
      {locationData ? (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="location_name" className="block text-sm font-medium text-gray-700">Location Name:</label>
            <input
              type="text"
              id="location_name"
              name="location_name"
              value={formData.location_name}
              onChange={handleInputChange}
              className='text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              
            />
          </div>
          <div>
            <label htmlFor="location_street_address" className="block text-sm font-medium text-gray-700">Street Address:</label>
            <input
              type="text"
              id="location_street_address"
              name="location_street_address"
              value={formData.location_street_address}
              onChange={handleInputChange}
              className='text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              
            />
          </div>
          <div>
            <label htmlFor="location_city" className="block text-sm font-medium text-gray-700">City:</label>
            <input
              type="text"
              id="location_city"
              name="location_city"
              value={formData.location_city}
              onChange={handleInputChange}
              className='text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              
            />
          </div>
          <div>
            <label htmlFor="location_state" className="block text-sm font-medium text-gray-700">State:</label>
            <input
              type="text"
              id="location_state"
              name="location_state"
              value={formData.location_state}
              onChange={handleInputChange}
              className='text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              
            />
          </div>
          <div>
            <label htmlFor="location_zipcode" className="block text-sm font-medium text-gray-700">Zipcode:</label>
            <input
              type="text"
              id="location_zipcode"
              name="location_zipcode"
              value={formData.location_zipcode}
              onChange={handleInputChange}
              className='text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              
            />
          </div>
          <div>
            <label htmlFor="exception_dates" className="block text-sm font-medium text-gray-700">Exception Dates:</label>
            <input
              type="text"
              id="exception_dates"
              name="exception_dates"
              value={formData.exception_dates.join(", ")} // Display as comma-separated string
              onChange={handleInputChange}
              className='text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>
          <button type="submit"  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update Location</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Location;
