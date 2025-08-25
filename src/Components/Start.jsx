
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:3000/verify")
      .then(result => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/employee_detail/" + result.data.id);
          }
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <h2 className="text-center">Login / Signup As</h2>

        {/* --- Employee Section --- */}
        <div className="d-flex justify-content-between mt-4 mb-2">
         
          <button
            type="button"
            className="btn btn-outline-primary w-50"
            onClick={() => navigate("/employeesignup")}
          >
            Employee Signup
          </button>
        </div>

        {/* --- Admin Section --- */}
        <div className="d-flex justify-content-between mt-3">
          <button
            type="button"
            className="btn btn-success w-50 me-2"
            onClick={() => navigate("/adminlogin")}
          >
            Admin Login
          </button>
          <button
            type="button"
            className="btn btn-outline-success w-50"
            onClick={() => navigate("/adminsignup")}
          >
            Admin Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
