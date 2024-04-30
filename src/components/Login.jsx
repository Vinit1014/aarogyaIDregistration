import React from "react";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Captcha from "./Captcha";

const Login = () => {
  // const [email, setEmail] = useState('')
  const [number, setNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [select, setSelect] = useState(true);
  const handleSignIn = () => {};

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
            <div className={select ?"border-red-200 border-2 px-4 py-2 mr-6":"border-red-500 border-2 px-4 py-2 mr-6" } >
              <button onClick={selectFun}>
                Healthcare Professional ID/Username
              </button>
            </div>
            <div className={select ? "border-red-500 border-2 px-14 py-2": "border-red-200 border-2 px-14 py-2"}>
              <button onClick={selectFun}>Mobile number</button>
            </div>
          </div>

          {select ? (
            <>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Mobile number
              </label>
              <div className="mt-2">
                <input
                  id="mobilenumber"
                  name="number"
                  type="tel"
                  // autoComplete="email"
                  onChange={(e) => setNumber(e.target.value)}
                  value={number}
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
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  // autoComplete="email"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </>
          )}
        </div>

        <Captcha />

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
