
import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeManagement = () => {
  // Employee list state
  const [employees, setEmployees] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", category: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Add employee state
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category: "",
    image: null,
  });

  // ✅ Fetch categories once
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category", { withCredentials: true })
      .then((res) => {
        if (res.data.Status) setCategories(res.data.Result);
      })
      .catch((err) => console.log(err));
  }, []);

  // ✅ Fetch employees whenever filters/page changes
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:3000/employee", {
          params: { ...filters, page, limit: 5 },
          withCredentials: true,
        });
        if (res.data.Status) {
          setEmployees(res.data.Result);
          setTotalPages(res.data.totalPages);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmployees();
  }, [filters, page]);

  // ✅ Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1); // reset to first page on filter change
  };

  // ✅ Handle add employee submit
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newEmployee).forEach((key) => {
      formData.append(key, newEmployee[key]);
    });

    try {
      const res = await axios.post("http://localhost:3000/auth/add_employee", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.Status) {
        alert("Employee added successfully!");
        setNewEmployee({
          name: "",
          email: "",
          password: "",
          salary: "",
          address: "",
          category: "",
          image: null,
        });
        setPage(1); // reload first page
        setFilters({ name: "", email: "", category: "" }); // reset filters
      } else {
        alert(res.data.Error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Employee Management</h3>

      {/* ================= Add Employee Form ================= */}
      <div className="p-3 rounded border mb-4">
        <h5>Add New Employee</h5>
        <form className="row g-2" onSubmit={handleAddEmployee}>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={newEmployee.password}
              onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Salary"
              value={newEmployee.salary}
              onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={newEmployee.address}
              onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={newEmployee.category}
              onChange={(e) => setNewEmployee({ ...newEmployee, category: e.target.value })}
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="file"
              className="form-control"
              onChange={(e) => setNewEmployee({ ...newEmployee, image: e.target.files[0] })}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>

      {/* ================= Filters ================= */}
      <div className="row mb-3">
        <div className="col-md-3">
          <input
            type="text"
            name="name"
            placeholder="Search by name"
            className="form-control"
            value={filters.name}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="email"
            placeholder="Search by email"
            className="form-control"
            value={filters.email}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-3">
          <select
            name="category"
            className="form-select"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ================= Employee Table ================= */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.salary}</td>
                <td>{emp.category?.name || "Unassigned"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ================= Pagination ================= */}
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-outline-primary me-2"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span className="align-self-center">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary ms-2"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeManagement;
