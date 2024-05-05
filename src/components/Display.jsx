import React from "react";
import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner'

const Display = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [license, setLicense] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [select, setSelect] = useState(true);
  const [otp, setOtp] = useState("");
  const [submit, setSubmit] = useState(false);
  const [number, setNumber] = useState("");
  const [emaill, setEmaill] = useState("");
  const [datee, setDatee] = useState();

  const [redirectt, setRedirect] = useState(false);

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

  const handleSignUp = () => {
    // setSubmit(!submit);
    // toast("Just for printing")
    toast.info('This is just a display after login page.')
  };

  useEffect(() => {
    const token = getCookie("token");
    console.log(token);
    if (!token) {
      setRedirect(true);
    }
  }, []);

  useEffect(() => {
    console.log(select);
  }, [select]);
  const selectFun = () => {
    setSelect(!select);
  };

  if (redirectt) {
    navigate("/login");
  }

  function deleteTokenFromCookies() {
    // Set the token cookie's expiration date to the past
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setRedirect(true);
  }

  const handleLogOut = async () => {
    toast.success("Successfully logged out")
    deleteTokenFromCookies();
  };

  return (
    <div className="flex border-2 border-red-300 min-h-full flex-col justify-center m-2 px-6 py-12 lg:px-8">
      <Toaster />
      <div className="border-2 border-red-400 text-center font-medium p-2 mb-16">
        Display content for printing information fetching Aadhar card API.
        <div className="items-center mt-2 mx-96">
          <button
            type="submit"
            className="flex w-30 justify-center mx-56 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-indigo-600"
            onClick={handleLogOut}
          >
            Logout
          </button>

          <div>
            <Toaster richColors/>
            
            <button onClick={() => toast('My first toast')}>
              Give me a toast
            </button>
          </div>
        </div>
      </div>

      <div className="sm:mx-auto border-2 border-red-300 sm:w-full sm:max-w-xl">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Registration Form(Mobile verification is required)
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="grid grid-rows-1 grid-flow-col gap-4">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Mobile Number
            </label>
            <div className="mt-2">
              <input
                id="moiblenumber"
                name="mobilenumber"
                type="text"
                // autoComplete="email"
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                // autoComplete="email"
                onChange={(e) => setEmaill(e.target.value)}
                value={emaill}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Date of Birth
            </label>
            <div className="mt-2">
              <input
                id="dob"
                name="dob"
                type="date"
                // autoComplete="email"
                onChange={(e) => setDatee(e.target.value)}
                value={datee}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-rows-1 grid-flow-col gap-4">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Mobile Number
            </label>
            <div className="mt-2">
              <input
                id="moiblenumber"
                name="mobilenumber"
                type="text"
                // autoComplete="email"
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                // autoComplete="email"
                onChange={(e) => setEmaill(e.target.value)}
                value={emaill}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

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

export default Display;
