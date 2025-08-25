import  { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/profile/", { withCredentials: true })
      .then(res => {
        console.log(res.data); // debug response
        if (res.data.success) {
          setProfile(res.data.user);
        }
      })
      .catch(err => console.log(err));
  }, []);

  if (!profile) return <div className="text-center mt-4">Loading profile...</div>;

  return (
    <div className="container mt-4">
      <h3>Profile</h3>
      <div className="card p-3 shadow-sm">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
        {profile.salary && <p><strong>Salary:</strong> ${profile.salary}</p>}
        {profile.address && <p><strong>Address:</strong> {profile.address}</p>}
        {profile.category && <p><strong>Category:</strong> {profile.category.name}</p>}
      </div>
    </div>
  );
};

export default Profile;
