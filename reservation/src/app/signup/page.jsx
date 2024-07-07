"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/navigation'

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//change password input to type text
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("")
  const [error, setError] = useState('');
  const router = useRouter()
  const phonenum_exp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const validatePassword = (password) => {
    const minLength = 12;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?"{}|{}<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasSpecialChar;
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!phonenum_exp.test(phone_number)) {
       setError(-"Invalid phone number format");
       return;
    }

    if(!validatePassword(password)) {
      setError("Password must be at least 12 charcters long, contain one uppercase, contain one lowercase, and one special symbol")
      return;
    }

    setError("")

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {username, password, first_name, last_name, phone_number});
      console.log(response.status);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error creating account",error)
    }

    router.push("/login");
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="first_name">Given Name</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="text-black"
          />
        </div>
        <div>
          <label htmlFor="last_name">Surname</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="text-black"
          />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="text-black"
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="email"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
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
            required
            className="text-black"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Link href={"/login"}><button type="submit">Create Account</button></Link>
      </form>
    </div>
  );
};
export default SignUp;