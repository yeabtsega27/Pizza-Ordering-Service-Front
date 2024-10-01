import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const baseURL = "http://localhost:4000/api/v1/";
// const baseURL = "https://pizza-ordering-service-back.onrender.com/api/v1/";

// Create an instance of Axios

export const instance = axios.create({
  baseURL: baseURL, // Set the base URL for the requests
  timeout: 5000, // Set a default timeout
  headers: {
    "Content-Type": "application/json", // Set default headers
    // Other default headers can be added here
    Authorization: "Bearer " + localStorage.getItem("pizzaorderingtoken"),
  },
});

const AxioxFatch = () => {
  const { Auth } = useAuth();
  const [token, setToken] = useState(
    localStorage.getItem("pizzaorderingtoken")
  );
  console.log({ Auth });
  console.log({ token: localStorage.getItem("pizzaorderingtoken") });

  const instance = axios.create({
    baseURL: baseURL, // Set the base URL for the requests
    timeout: 5000, // Set a default timeout
    headers: {
      "Content-Type": "application/json", // Set default headers
      // Other default headers can be added here
      Authorization: "Bearer " + token,
    },
  });
  useEffect(() => {
    setToken(localStorage.getItem("pizzaorderingtoken"));
  }, [Auth]);
  return { instance };
};

export default AxioxFatch;
