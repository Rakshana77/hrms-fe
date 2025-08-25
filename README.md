# Employee Management System

A full-stack **Employee Management System** built with **React.js (Frontend)**, **Node.js & Express.js (Backend)**, and **MongoDB**.  

The system allows you to:

- Add, view, and manage employees  
- Filter employees by name, email, and category  
- Pagination support for employee list  
- Employee profile display  
- JWT-based authentication for Admin and Employees  

---

## Tech Stack

**Frontend:**
- React.js  
- Bootstrap 5  
- Axios  

**Backend:**
- Node.js  
- Express.js  
- MongoDB / Mongoose  
- JWT Authentication  
- Cookie-based sessions  

---

## Project Structure

### Frontend (React)
employee-management-fe/
├─ src/
│ ├─ components/
│ │ ├─ EmployeeManagement.jsx
│ │ ├─ Profile.jsx
│ │ ├─ AddEmployee.jsx
│ │ └─ Login.jsx
│ ├─ App.jsx
│ └─ index.jsx
├─ package.json
└─ ...

shell
Copy
Edit

### Backend (Node.js + Express)
employee-management-be/
├─ models/
│ ├─ Admin.js
│ └─ Employee.js
├─ routes/
│ ├─ Profile.js
│ ├─ Employee.js
│ └─ Auth.js
├─ server.js
├─ package.json
└─ ...

yaml
Copy
Edit

---

## Features

### Frontend
- Employee List: View all employees with pagination and filters  
- Add Employee: Form to add new employee with image upload  
- Profile: View logged-in employee or admin profile  
- Responsive UI using Bootstrap  

### Backend
- JWT Authentication: Admin and Employee login  
- CRUD Operations: Add and manage employees  
- Profile Route: Returns logged-in user info  

---

## API Routes (Backend)

| Method | Route                   | Description                                      | Auth Required |
|--------|------------------------|--------------------------------------------------|---------------|
| POST   | `/auth/login`          | Login for Admin or Employee                      | No            |
| POST   | `/auth/signup`         | Signup for Admin or Employee                     | No            |
| GET    | `/profile`             | Get logged-in user profile                       | Yes (JWT)     |
| GET    | `/employees`           | Get all employees with pagination & filter      | Yes (Admin)   |
| POST   | `/employees`           | Add a new employee                               | Yes (Admin)   |
| PUT    | `/employees/:id`       | Update employee data                             | Yes (Admin)   |
| DELETE | `/employees/:id`       | Delete employee                                  | Yes (Admin)   |

---

## Frontend Components

| Component Name          | File Path                        | Description                                      |
|-------------------------|----------------------------------|--------------------------------------------------|
| `Login`                 | `src/components/Login.jsx`       | Handles login for Admin and Employee            |
| `Profile`               | `src/components/Profile.jsx`     | Shows logged-in user profile                     |
| `EmployeeManagement`    | `src/components/EmployeeManagement.jsx` | List, filter, and paginate employees      |
| `AddEmployee`           | `src/components/AddEmployee.jsx` | Form to add a new employee                        |
| `App`                   | `src/App.jsx`                     | Routes and main component                        |

---

## Setup & Installation

### Backend
1. Clone the backend repo:
```bash
git clone https://github.com/Rakshana77/employee-management-be.git
cd employee-management-be
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
Start the server:

bash
Copy
Edit
npm run dev
Server runs on http://localhost:3000

Frontend
Clone the frontend repo:

bash
Copy
Edit
git clone https://github.com/Rakshana77/employee-management-fe.git
cd employee-management-fe
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run dev
Frontend runs on http://localhost:5173 (Vite default)

Usage
Admin Login: Access all employee management features.

Employee Login: View profile only.

Add Employee: Admin can add employees with name, email, password, salary, address, category, and image.

Employee List: Filter by name, email, category. Pagination included.

Profile: View logged-in user’s information.

Notes
Ensure backend server runs before starting the frontend.

Make sure cookies or JWT token are correctly set for authentication.

Image uploads are handled via multipart/form-data.

License
This project is open source and free to use.

yaml
Copy
Edit

---

If you want, I can **also create a version with screenshots and badges** for a more professional GitHub look.  

Do you want me to do that next?
