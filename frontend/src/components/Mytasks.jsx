import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Navbar from "./Navbar";
import { useBeforeUnload } from "react-router-dom";
import axios from "axios";
const Mytasks = () => {
  const [alltasks, setAlltasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null); // New state
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const stored = JSON.parse(localStorage.getItem("userInfo"));
  const token = stored.token;
  const { login, authState, logout } = useContext(AuthContext);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDescription, setUpdatedDescrition] = useState("");

  const getAllTasks = async (url) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/task/`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAlltasks(data);
      const total = alltasks.length;
      console.log(total);
      localStorage.setItem("totalMytask", JSON.stringify(total));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleDeleteClick = async(selectedTaskId) => {
      setSelectedTaskId(selectedTaskId);
       try {
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const data = await axios.delete(
            `${process.env.REACT_APP_URL}/task/${selectedTaskId}`,
    
            config
          );
          console.log(data);
          alert("your task has been successfully deleted");
            getAllTasks();
        } catch (error) {
          console.log(error);
        }
  };

  const handleUpdateClick = (taskId) => {
    console.log(`Update task with ID ${taskId}`);
    setSelectedTaskId(taskId);
    setUpdateFormOpen(true);
  };
    const changeTask = async () => {
        const payload = {
            title: updatedTitle,
            description:updatedDescription
        }
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const data = await axios.patch(
            `${process.env.REACT_APP_URL}/task/${selectedTaskId}`,
            payload,
            config
          );
          console.log(data);
          alert("your task has been successfully updated");
            getAllTasks();
        } catch (error) {
          console.log(error);
        }
        console.log(selectedTaskId);
}
  return (
    <div>
      <Navbar></Navbar>
      <div className="mx-auto p-8 md:px-16 lg:px-24 xl:px-32">
        <ul role="list" className="divide-y divide-gray-100">
          {alltasks.map((person) => (
            <li
              key={person.email}
              className="flex justify-between gap-x-6 py-5  px-4 border border-gray-300 rounded-md shadow-sm"
            >
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={person.createdBy.profile}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {person.title}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-black">
                    {person.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  className="text-gray-900 hover:text-blue-700"
                  onClick={() => handleUpdateClick(person._id)}
                >
                  Update
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteClick(person._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {updateFormOpen && selectedTaskId !== null && (
          <div>
            <form>
              {/* Your update form JSX here */}
              {/* Example: */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="updatedTitle"
                    className="block text-sm font-medium leading-6 text-gray-900 left-align"
                  >
                    change title
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="updatedTitle"
                    name="updatedTitle"
                    type="updatedTitle"
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="updatedDescription"
                    className="block text-sm font-medium leading-6 text-gray-900 left-align"
                  >
                    change description of the task
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="updatedDescription"
                    name="updatedDescription"
                    type="updatedDescription"
                    onChange={(e) => setUpdatedDescrition(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <button
                type="submit"
                onClick={changeTask}
                className=" mt-5 flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Make updates
              </button>
            </form>
          </div>
        )}
      </div>

      <a
        href="/home"
        className="block text-md font-medium leading-6 text-blue-1900 text-left mt-8"
      >
        --- Back to home page
      </a>
    </div>
  );
};

export default Mytasks;
