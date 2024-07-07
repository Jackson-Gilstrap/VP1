"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "@/lib/features/global/globalSlice";

const VerticalNavbar = ({ name }) => {
  const dispatch = useDispatch();
  const isloggedIn = useSelector((state) => state.global.isloggedIn);
  const handleLogout = () => {
    dispatch(setIsLoggedIn(false));
  };
  return (
    <div className="h-screen w-64 bg-gray-200 p-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Hi {name}!</h2>
        <p className="text-gray-600">Welcome to your dashboard</p>
      </div>
      <div>
        <ul className="space-y-4">
          <Link href={"/dashboard"}>
            <li className="text-gray-800 hover:text-blue-500 cursor-pointer">
              Main
            </li>
          </Link>
          <Link href={"/dashboard/locations"}>
            <li className="text-gray-800 hover:text-blue-500 cursor-pointer">
              Locations
            </li>
          </Link>
          <Link href={"/dashboard/appointments"}>
          <li className="text-gray-800 hover:text-blue-500 cursor-pointer">
            Appointments
          </li>
          </Link>
          <li className="text-gray-800 hover:text-blue-500 cursor-pointer">
            Reservations
          </li>
        </ul>
      </div>

      <Link href={"/"} onClick={handleLogout}>
        <span className="mt-8 block text-blue-500 cursor-pointer">Log out</span>
      </Link>
    </div>
  );
};

export default VerticalNavbar;
