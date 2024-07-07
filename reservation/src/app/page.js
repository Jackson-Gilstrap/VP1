"use client";
import Link from "next/link";
import NavBar from "@/components/navbar";
import { useSelector } from "react-redux";
export default function Home() {
  const loginStatus = useSelector((state) => state.global.isloggedin);
  const employee_info = useSelector((state) => state.user);
  console.log(employee_info);
  return (
    <div>
      <NavBar isloggedin={loginStatus} />
      <h1 className="block text-center my-4">
        Hartwick VITA/TCE
        <br />
        Reservation Portal
      </h1>
      {loginStatus && (
        <p className="text-center text-2xl my-4">
          Welcome {employee_info.userDetails.fname} {employee_info.userDetails.lname}
        </p>
      )}
      {loginStatus ? (
        <Link href={"/dashboard"}>
          <span className="bg-white text-sky-600 block text-center max-w-48 mx-auto py-2 rounded-full hover:bg-black hover:text-sky-400 hover:cursor-pointer">
            {" "}
            Volunteers Start Here
          </span>
        </Link>
      ) : (
        <Link href={"/reservation"}>
          <span className="bg-white text-sky-600 block text-center max-w-48 mx-auto py-2 rounded-full hover:bg-black hover:text-sky-400 hover:cursor-pointer">
            Clients Start Here
          </span>
        </Link>
      )}
    </div>
  );
}
