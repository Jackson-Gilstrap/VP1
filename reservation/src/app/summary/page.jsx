'use client';
import Link from "next/link";
import { useSelector } from "react-redux";

const SummaryPage = ()=> {
    const reservation = useSelector((state) => state.reservation);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-2xl font-bold text-center text-gray-600 mb-4">Booking Confirmation</h1>
            <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Booking details</h2>
                <div className="bg-gray-50 p-4 rounded-lg-mg-4">
                    <p className="text-black">{reservation.reservation_type} @{reservation.reservation_location}</p>
                    <p className="text-black">Date: {reservation.reservation_date}</p>
                    <p className="text-black">Time: {reservation.reservation_time}</p>
                    <p className="text-black">Duration: {reservation.reservation_duration}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg-mg-4">
                    <p className="text-black">{reservation.reservation_given_name}{' '}{reservation.reservation_surname}</p>
                    <p className="text-black">{reservation.reservation_phone_number}</p>
                </div>
            </div>
            <div>
                <h2>Subcribe to our mailing list</h2>
                <form action="">
                <input type="email" name="email" id="email" />
                <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                <Link href={'/'}><button>Finish</button></Link>
            </div>
        </div>
    )
}

export default SummaryPage;