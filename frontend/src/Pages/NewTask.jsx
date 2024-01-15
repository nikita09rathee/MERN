import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const NewTask = () => {
  const stored = JSON.parse(localStorage.getItem("userInfo"));
    const name = stored.data.name;
    const navigate = useNavigate();
    const token = stored.token;
    console.log(token);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  const handleNewtask = async(e) => {
      e.preventDefault();
      const payload = {
          title,
          description
      }
      try {
           const config = {
             headers: {
               "Content-type": "application/json",
              "Authorization": `Bearer ${token}`,
             },
           };
           const data  = await axios.post(
             `${process.env.REACT_APP_URL}/task/create`,
             payload,
             config
           );
          console.log(data);
          alert("your task has been successfully added");
          navigate("/home");
      }
      catch (error) {
          console.log(error);
      }
  };

  return (
    <div
      className="bg-cover   bg-gray-800 mx-auto p-8 md:mx-16 lg:mx-32 xl:mx-64"
     
    >
      <form>
        <div className="space-y-12">
          <div className="bg-white bg-opacity-90 p-8 md:p-12 lg:p-16 xl:p-20 rounded-lg">
            <h2 className="block text-2xl font-bold leading-6 text-gray-900">
              WELCOME
            </h2>
            <p className="mt-4 text-xl font-bold leading-6 text-gray-800">
              Hey {name}! Make your busy life easy... Add daily tasks
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-xl font-medium leading-6 text-gray-900 text-left"
                >
                  Add Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="title"
                      className="block w-full rounded-md bg-gray-100 px-6 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Give title to your task"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full ">
                <label
                  htmlFor="about"
                  className="block text-xl font-medium leading-6 text-gray-900 text-left "
                >
                  Description
                </label>
                <div className="mt-2">
                  <input
                    id="about"
                    name="about"
                    rows={3}
                    placeholder="Please describe the task briefly"
                    className="block w-full rounded-md bg-gray-100 px-6 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-9">
              <button
                type="submit"
                onClick={handleNewtask}
                className="flex w-full justify-center rounded-md bg-gray-800 px-6 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-5 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
              >
                Create new task
              </button>
            </div>
            <a
              href="/home"
              className="block text-md font-medium leading-6 text-gray-900 text-left mt-8"
            >
             --- Back to home page
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewTask;
