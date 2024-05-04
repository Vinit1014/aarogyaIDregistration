import React from "react";
import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";

// import Captcha from "./Captcha";

const Login = () => {
  axios.defaults.withCredentials = true;
  const [email, setEmail] = useState('')
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("+91 ");
  const [userName, setUserName] = useState("");
  const [select, setSelect] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [success, setSuccess] = useState();
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [check,setCheck] = useState(''); //for verify OTP 

  useEffect(() => {
    console.log(success);
  }, [success]);

  useEffect(()=>{
    console.log(check);
  })

  function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.get("https://aarogya-i-dregistration-api.vercel.app/api/protected", {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`, // Assuming you store the token in localStorage
        },
      });
      // Update state with fetched user data
      setCheck(response);
      if (response) {
        navigate('/app')
      }
    } catch (error) {
      // Handle errors
      console.log(error);
      // setError(error.response.data.error);
    }
  };

  const handleSignIn = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Invalid email address.");
      return;
    }
    setSubmit(!submit);
    try {
      // Send Aadhar number and mobile number to server to send OTP
      const request = await axios.post(
        "https://aarogya-i-dregistration-api.vercel.app/apilogin/send-otp",
        {
          // mobileNumber: mobileNumber,
          email: email,
        }
      );
      // setSubmit(true);
      setSuccessMessage("OTP successfully sent to registered emailID")
      setSuccess(request);
      // console.log(request);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage("Error sending OTP. Please try again later.");
    }
  };

  useEffect(() => {
    console.log(select);
  }, [select]);

  const selectFun = () => {
    setSelect(!select);
    // console.log(select);
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login to National Healthcare Providers Registry
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
        <div>
          <div className="flex mb-4">
            <div
              className={
                select
                  ? "border-red-200 border-2 px-4 py-2 mr-6"
                  : "border-red-500 border-2 px-4 py-2 mr-6"
              }
            >
              <button onClick={selectFun}>
                Healthcare Professional ID/Username
              </button>
            </div>
            <div
              className={
                select
                  ? "border-red-500 border-2 px-14 py-2"
                  : "border-red-200 border-2 px-14 py-2"
              }
            >
              <button onClick={selectFun}>Email Address</button>
            </div>
          </div>

          {select ? (
            <>
              {/* <label className="block text-sm font-medium leading-6 text-gray-900">
                Mobile number
              </label>
              <div className="mt-2 mb-2 border-2 border-gray-400 rounded-md">
                <input
                  id="mobilenumber"
                  name="number"
                  type="tel"
                  // autoComplete="email"
                  onChange={(e) => setMobileNumber(e.target.value)}
                  value={mobileNumber}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div> */}
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2 mb-2 border-2 border-gray-400 rounded-md">
                <input
                  id="emailaddress"
                  name="email"
                  type="email"
                  // autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </>
          ) : (
            <>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Healthcare Professional ID/Username
              </label>
              <div className="mt-2 mb-2 border-2 border-gray-400 rounded-md">
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </>
          )}
        </div>

        {submit && (
          <>
            <div className="mt-6 my-4">
              <label
                htmlFor="otp"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter OTP (6 digits)
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                maxLength={6} // Limit input to 6 characters
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-2"
                placeholder="Enter OTP"
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleVerifyOTP}
                >
                  Verify OTP
                </button>
              </div>
            </div>
          </>
        )}

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        </div>
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="font-semibold text-gray-500 transition-colors hover:text-black"
          >
            Sign up
          </NavLink>
        </p>
      </div>
      {errorMessage && (
        <div className="text-red-500 text-sm text-center">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="text-green-500 text-md text-center">{successMessage}</div>
      )}
    </div>
  );
};

export default Login;
