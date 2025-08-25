import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/auth/adminsignup", values)
        .then((res) => {
          console.log(res)
        if (res.data.Status) {
          alert("Admin registered successfully! Please login.");
          navigate("/adminlogin"); // Redirect to login
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <h2>Admin Signup</h2>
        {error && <div className="text-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email:</label>
            <input type="email" className="form-control" 
              onChange={(e) => setValues({ ...values, email: e.target.value })} />
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <input type="password" className="form-control"
              onChange={(e) => setValues({ ...values, password: e.target.value })} />
          </div>
          <button className="btn btn-primary w-100">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
