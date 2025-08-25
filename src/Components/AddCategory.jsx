
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:3000/auth/add_category",
        { category },
        { withCredentials: true }   // ✅ important: allow cookies (JWT auth)
      );

      if (result.data.Status) {
        navigate("/dashboard/category");
      } else {
        alert(result.data.Error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while adding category");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="p-3 rounded w-25 border">
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category">
              <strong>Category:</strong>
            </label>
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control rounded-0"
              required
            />
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
