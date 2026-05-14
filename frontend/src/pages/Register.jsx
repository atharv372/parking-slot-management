import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert("Registration successful");

      navigate("/");

    } catch (err) {

      console.log(err);

      alert("Registration failed");
    }
  };

  return (

    <div className="bg-gray-900 flex items-center justify-center py-20">

      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-lg w-96 shadow-lg"
      >

        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white outline-none"
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded"
        >
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;