import React, { useState } from "react";
import axios from "axios";

const MyProfile = () => {
  const stored = JSON.parse(localStorage.getItem("userInfo"));
  const name = stored?.data?.name || "";
  // const number = stored?.data?.phone || "";
  const [number, setNumber] = useState(stored?.data?.phone || "");
  // const address = stored?.data?.address || "";
  const[address,setAddress]=useState(stored?.data?.address || "")
  const [location, setLocation] = useState(address);
  const [phone, setPhone] = useState(number);
  const total = JSON.parse(localStorage.getItem("totalMytask"));
  const token = stored.token;
  const [editphone, setEditphone] = useState(stored?.data?.phone ? false : true );
  const [editAddress, setEditaddress] = useState(
    stored?.data?.address ? false : true
  );
  const handleSubmit = async (id, e) => {
    e.preventDefault();
    console.log("fdghj");

    const payload = {
      name: name,
      email: stored.data.email,
      username: stored.data.username,
      password: stored.data.password,
      address: location,
      phone: phone,
      profile: stored?.data?.profile || "",
    };

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const data = await axios.put(
        `${process.env.REACT_APP_URL}/user/update/${id}`,
        payload,
        config
      );
      console.log(data.data);
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      if (phone) {
        setEditphone(false);
        setNumber(phone);
      }
      if (location) {
        setEditaddress(false);
        setAddress(location);
      }
      alert("Your data has been successfully added");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddressChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl bg-white shadow-md p-8 rounded-md">
        <div>
          <h3 className="text-2xl font-bold leading-9 text-gray-900 text-center">
            Applicant Information
          </h3>
          <p className="mt-4 max-w-2xl text-md leading-6 text-gray-500 text-center">
            Personal details and application.
          </p>
        </div>
        <div className="mt-9 border-t border-gray-900">
          <dl className="divide-y divide-gray-500">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-xl font-medium leading-6 text-gray-900">
                Full Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-xl font-medium leading-6 text-gray-900">
                Email Address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {stored.data.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-xl font-medium leading-6 text-gray-900">
                Phone Number
              </dt>
              <dd className="mt-1 ml-9 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {editphone ? (
                  <form
                    onSubmit={(e) => handleSubmit(stored.data._id, e)}
                    className="flex"
                  >
                    <input
                      placeholder="add phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="ml-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-indigo-300 active:bg-indigo-800"
                    >
                      Submit
                    </button>
                  </form>
                ) : (
                  <p className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {number}{" "}
                    {/* <span onClick={() => setEditphone(true)}>edit</span> */}
                    <button
                      onClick={() => setEditphone(true)}
                      type="submit"
                      className="ml-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-indigo-300 active:bg-indigo-800"
                    >
                      Edit
                    </button>
                  </p>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-xl font-medium leading-6 text-gray-900">
                Username
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {stored.data.username}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-xl font-medium leading-6 text-gray-900">
                Address
              </dt>
              <dd className="mt-1 ml-9 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {editAddress ? (
                  <form
                    onSubmit={(e) => handleSubmit(stored.data._id, e)}
                    className="flex"
                  >
                    <input
                      placeholder="add address"
                      value={location}
                      onChange={handleAddressChange}
                    />
                    <button
                      className="ml-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-indigo-300 active:bg-indigo-800"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                ) : (
                  <p className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {address}
                    <button
                      onClick={() => setEditaddress(true)}
                      type="submit"
                      className="ml-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-indigo-300 active:bg-indigo-800"
                    >
                      Edit
                    </button>
                  </p>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-xl font-medium leading-6 text-gray-900">
                My tasks
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {total}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
