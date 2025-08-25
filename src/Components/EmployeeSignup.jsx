import{ useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeSignup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    salary: ""
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/employee/signup", values)
     
  .then((res) => {
    if (res.data.Status) {
      localStorage.setItem("valid", true);
      // Redirect directly to employee detail
      navigate("/employee_detail/" + res.data.id);
    } else {
      setError(res.data.Error);
    }
  })
  .catch((err) => console.log(err));

  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <h2>Employee Signup</h2>
        {error && <div className="text-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" className="form-control mb-2"
            onChange={(e) => setValues({ ...values, name: e.target.value })} />
          <input type="email" placeholder="Email" className="form-control mb-2"
            onChange={(e) => setValues({ ...values, email: e.target.value })} />
          <input type="password" placeholder="Password" className="form-control mb-2"
            onChange={(e) => setValues({ ...values, password: e.target.value })} />
          <input type="text" placeholder="Address" className="form-control mb-2"
            onChange={(e) => setValues({ ...values, address: e.target.value })} />
          <input type="number" placeholder="Salary" className="form-control mb-2"
            onChange={(e) => setValues({ ...values, salary: e.target.value })} />
          <button className="btn btn-success w-100">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeSignup;
