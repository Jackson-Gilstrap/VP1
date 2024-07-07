"use client";

import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation'

import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "@/lib/features/global/globalSlice";
import { setUser } from "@/lib/features/user/userSlice";

//change password input to type text
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router  = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {username, password});
      console.log(response.status);
      console.log(response.data.message);
      console.log(response.data.data)
      if(response.status === 200) {
        
        console.log("setting logged in")

        dispatch(setIsLoggedIn(true));
        dispatch(setUser({userType: "admin", userDetails: {
            fname: response.data.data.fname,
            lname: response.data.data.lname,
        }}))
        router.push("/");
  
      }
    } catch (error) {
      console.error("Error Logging in", error)
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-black"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black"
          />
        </div>
        <Link href={'/signup'}><span>Create Account</span></Link><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login