'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const LocationsPage = () => {

    const [locationsArray, setLocationsArray] = useState([])
    const router = useRouter();

   
    useEffect(()=> {
        const getLocations = async() => {
            try {
                const response  = await axios.get("http://localhost:5000/getLocations")
                console.log(response.data.data)
                setLocationsArray(response.data.data)
                
            } catch (error) {
                console.error(error)
            }

        }

        getLocations()
    },[])
    return (
        <div className="mx-auto">
            <h2> Here is your list of locations</h2>
            <div>
                <table className="border-collapse table-auto">
                    <thead>
                    <tr>
                        <th className="border border-slate-600">Name</th>
                        <th className="border border-slate-600">Street Address</th>
                        <th className="border border-slate-600">City</th>
                        <th className="border border-slate-600">State</th>
                        <th className="border border-slate-600">Zipcode</th>
                        <th className="border border-slate-600">Exception Dates</th>
                        <th className="border border-slate-600">X</th>
                    </tr>

                    </thead>
                    <tbody>
                    {locationsArray.length > 0 ? (
                        locationsArray.map((location)=> (
                            <tr key={location.location_id} className="bg-slate-800 hover:bg-slate-600">
                                <td className="border border-slate-600">{location.location_name}</td>
                                <td className="border border-slate-600">{location.location_street_address}</td>
                                <td className="border border-slate-600">{location.location_city}</td>
                                <td className="border border-slate-600">{location.location_state}</td>
                                <td className="border border-slate-600">{location.location_zipcode}</td>
                                <td className="border border-slate-600">{location.exception_dates.join(', ')}</td>
                                <td className="border border-slate-600"><Link href={{pathname:`/dashboard/locations/${location.location_id}`, query: {id: JSON.stringify(location.location_id)} }}>Edit</Link></td>
                            </tr>
                        ))
                    ): (<tr  className="bg-slate-800 hover:bg-slate-600">
                        <td  className='border border-slate-600 text-center'colSpan={6}>No Locations</td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LocationsPage;