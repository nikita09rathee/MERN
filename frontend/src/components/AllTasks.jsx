import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

const AllTasks = () => {
  const [alltasks, setAlltasks] = useState([]);
  const stored = JSON.parse(localStorage.getItem("userInfo"));
  const token = stored.token;

  const { login, authState, logout } = useContext(AuthContext);

  const getAllTasks = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/task/alltasks`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setAlltasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="mx-auto p-8 md:px-16 lg:px-24 xl:px-32">
      <ul
        role="list"
        className="divide-y divide-gray-100 py-2 px-4 border border-gray-500 rounded-md shadow-sm"
      >
        {alltasks.map((person) => (
          <li
            key={person.email}
            className="flex flex-col md:flex-row justify-between gap-x-6 py-5 px-4 border border-gray-300 rounded-md shadow-sm"
          >
            <div className="flex md:min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={person.createdBy.profile}
                alt=""
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {person.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-black">
                  {person.description}
                </p>
              </div>
            </div>
            <div className="hidden md:flex md:flex-col md:items-end">
              <p className="text-sm leading-6 text-gray-900">
                {person.createdBy.name}
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                {person.createdBy.username}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTasks;
