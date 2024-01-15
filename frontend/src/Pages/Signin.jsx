import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const { authState, login, logout } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    const payload = { email, password };
    setLoading(true);
    if (!email || !password) {
      alert("Give all credentials");
      setLoading(false);
      return;
    }
    // Email check
    if (!email.includes("@")) {
      alert("Invalid email");
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/user/login`,
        payload,
        config
      );
      console.log(data);
      alert("Account successfully logged in");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      const token = data.token;
      console.log(token);
      login(token);

      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("Account not created");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="w-full sm:max-w-md p-6 bg-gradient-gray-800 rounded-lg shadow-xl">
        <img
          className="mx-auto h-12 w-auto"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEKALJnqLWld6c6ZbggPEyDBxibV8mSwy62A&usqp=CAU"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSignin}>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
            </div>
            <div className="mt-2">
                          <input
                              placeholder="enter your email"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-2 text-blue-700 bg-white placeholder-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none focus:ring-opacity-50"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                              id="password"
                              placeholder="enter you password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-2 text-blue-900 bg-white placeholder-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none focus:ring-opacity-50"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-white rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-white">
          New User?{" "}
          <NavLink
            to="/"
            className="font-semibold leading-6 text-indigo-200 hover:text-indigo-100"
          >
            Create account
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signin;
