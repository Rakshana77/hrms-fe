
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee", { withCredentials: true }) // ✅ use JWT cookie
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result); // MongoDB returns [{_id, name, email, ...}]
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    axios
      .delete("http://localhost:3000/auth/delete_employee/" + id, { withCredentials: true })
      .then((result) => {
        if (result.data.Status) {
          // ✅ Update UI without reloading
          setEmployee(employee.filter((emp) => emp._id !== id));
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e._id}>
                <td>{e.name}</td>
                <td>
                  {e.image ? (
                    <img
                      src={`http://localhost:3000/Images/${e.image}`} // ✅ same static folder
                      className="employee_image"
                      alt="employee"
                      width="50"
                      height="50"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>
                <td>{e.category?.name || "Unassigned"}</td> {/* ✅ populate category */}
                <td>
                  <Link
                    to={`/dashboard/edit_employee/${e._id}`} // ✅ Mongo _id
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
