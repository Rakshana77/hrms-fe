
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/employee/${id}`, { withCredentials: true })
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result); // ✅ Expecting { Status: true, Employee: {...} }
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/employee/logout", { withCredentials: true })
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  if (!employee) {
    return <h3 className="text-center mt-5">Loading Employee Details...</h3>;
  }

  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>Employee Management System</h4>
      </div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        {employee.image ? (
          <img
            src={`http://localhost:3000/Images/${employee.image}`}
            className="emp_det_image"
            alt="employee"
            width="120"
            height="120"
          />
        ) : (
          <p>No Image Available</p>
        )}
        <div className="d-flex align-items-center flex-column mt-5">
          <h3>Name: {employee.name}</h3>
          <h3>Email: {employee.email}</h3>
          <h3>Salary: ${employee.salary}</h3>
          <h3>Category: {employee.category?.name || "Unassigned"}</h3>
        </div>
        <div className="mt-3">
          <button
            className="btn btn-primary me-2"
            onClick={() => navigate(`/dashboard/edit_employee/${employee._id}`)} // ✅ use Mongo _id
          >
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
