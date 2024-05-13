import React from "react";
import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from 'sonner';

const Login = () => {
  axios.defaults.withCredentials = true;
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("+91 ");
  const [userName, setUserName] = useState("");
  const [select, setSelect] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState("");
  // const [token, setToken] = useState("");
  const [redirectt, setRedirect] = useState(false);

  const [check, setCheck] = useState(""); //for verify OTP

  useEffect(() => {
    console.log("MEssageeeee" + check.data?.message);
  },[check]);

  useEffect(() => {
    const token = getCookie("token");
    console.log(token);
    if (token) {
      setRedirect(true);
    }
  }, []);
  useEffect(() => {
    console.log("Checking " + success.data?.message);
  }, [success]);

  const setCookie = (name, value, days) => {
    const token = getCookie("token");
    if (token == null) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = "expires=" + date.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
  };
  
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
      const response = await axios.post(
        "https://aarogyaidregistration-api.onrender.com/api/protected",
        { otp: otp },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      
      if (response.data?.message === "truee") {
        console.log("Success looking ahead");
        setRedirect(true);
        toast.success("OTP verification done");
      } else {
        toast.error("Invalid OTP");
      }

      setCheck(response);
      
    } catch (error) {
      // Handle errors
      console.log(error);
      // setError(error.response.data.error);
    }
  };

  const handleSignIn = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error('Invalid email address')
      return;
    }
    
    try {
      const loadingToastId = toast.loading('Sending OTP...');
      // Send Aadhar number to server to send OTP
      const response = await axios.post(
        "https://aarogyaidregistration-api.onrender.com/apilogin/send-otp",
        { 
          email: email,
        }
      );
      // setSubmit(true);
      toast.dismiss(loadingToastId);
      if (response.data?.message === "truee") {
        console.log("Success looking ahead");
        setSubmit(true);
        setCookie("token", response.data.token, 1);
        toast.success("OTP successfully sent to registered emailID");
      } else {
        setSubmit(false);
        toast.error("Email not registered");
      }
    } catch (error) {
      console.log(error);
      toast.error("Email sending error from catch block");
    }
  };

  useEffect(() => {
    console.log(select);
  }, [select]);

  const selectFun = () => {
    setSelect(!select);
    // console.log(select);
  };

  if (redirectt) {
    navigate("/app");
  }
  
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Toaster richColors/>
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
              <div className="mt-2 mb-2 border-2  rounded-md">
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
    </div>
  );
};

export default Login;
