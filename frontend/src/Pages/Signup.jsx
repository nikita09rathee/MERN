import React, { useState, useContext } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const payload = { name, email, password, username, profile };
    setLoading(true);
    if (!name || !email || !password || !username) {
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
        `${process.env.REACT_APP_URL}/user/signup`,
        payload,
        config
      );
      console.log(data);
      alert("Account successfully created");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Account not created");
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="w-full sm:max-w-md p-6 bg-gray-800 rounded-lg ">
        <img
          className="mx-auto h-12 w-auto"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEKALJnqLWld6c6ZbggPEyDBxibV8mSwy62A&usqp=CAU"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-2xl font-extrabold text-white">
          Create your account
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-white"
              >
                Full Name
              </label>
            </div>
            <div className="mt-2">
                          <input
                              placeholder="add name"
                id="name"
                name="name"
                type="string"
                autoComplete="name"
                required
                onChange={(e) => setName(e.target.value)}
                className=" p-3 block w-full rounded-md border-0 py-2 text-blue-700 bg-white placeholder-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none focus:ring-opacity-50"
              />
            </div>
          </div>

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
                              placeholder="add email"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 block w-full rounded-md border-0 py-2 text-blue-700 bg-white placeholder-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none focus:ring-opacity-50"
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
                              placeholder="add password"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className=" p-3 block w-full rounded-md border-0 py-2 text-blue-900 bg-white placeholder-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none focus:ring-opacity-50"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
              >
                Username
              </label>
            </div>
            <div className="mt-2 ">
                          <input
                              placeholder="ad username"
                id="username"
                name="username"
                type="string"
                autoComplete="username"
                required
                onChange={(e) => setUsername(e.target.value)}
                className=" p-3 block w-full rounded-md border-0 py-2 text-blue-900 bg-white placeholder-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none focus:ring-opacity-50"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-white"
              >
                Profile Image
              </label>
            </div>
            <div className="mt-2">
                          <input
                              placeholder="upload image"
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full rounded-md border-0 py-2 text-blue-900 bg-white placeholder-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none focus:ring-opacity-50"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-white rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-white">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="font-semibold leading-6 text-indigo-200 hover:text-indigo-100"
          >
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
