import React from "react";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Captcha from "./Captcha";

const Register = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [license, setLicense] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [select, setSelect] = useState(true);
  const [otp, setOtp] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleSignUp = () => {
    setSubmit(!submit);
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
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your Healthcare Professional ID
        </h2>
        <h3 className="mt-10 text-center text-sm m-0 font-bold leading-9 tracking-tight text-gray-900">
          The Healthcare Professional ID will connect you to the India's Digital
          Health ecosystem
        </h3>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="flex mb-4">
          <div
            className={
              select
                ? "border-red-200 border-2 px-24 py-2 mr-6"
                : "border-red-500 border-2 px-24 py-2 mr-6"
            }
          >
            <button onClick={selectFun}>Driving License</button>
          </div>
          <div
            className={
              select
                ? "border-red-500 border-2 px-24 py-2"
                : "border-red-200 border-2 px-24 py-2"
            }
          >
            <button onClick={selectFun}>Aadhar</button>
          </div>
        </div>

        {select ? (
          <>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Aadhar Number
            </label>
            <div className="mt-2">
              <input
                id="aadharnumber"
                name="aadharnumber"
                type="text"
                // autoComplete="email"
                onChange={(e) => setAadhar(e.target.value)}
                value={aadhar}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </>
        ) : (
          <>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Driving License
            </label>
            <div className="mt-2">
              <input
                id="drivinglicense"
                name="drivinglicense"
                type="text"
                // autoComplete="email"
                onChange={(e) => setLicense(e.target.value)}
                value={license}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </>
        )}

        {submit ? (
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
            </div>
          </>
        ) : (
          <Captcha />
        )}

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSignUp}
          >
            Submit
          </button>
        </div>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="font-semibold text-gray-500 transition-colors hover:text-black"
          >
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
