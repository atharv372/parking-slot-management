import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://parking-backend-33il.onrender.com/api/auth/login",
        formData
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Login successful");

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      alert("Invalid credentials");
    }
  };

  return (

    <div className="bg-gray-900 flex items-center justify-center py-20">

      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg w-96 shadow-lg"
      >

        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Login
        </h2>

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
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;