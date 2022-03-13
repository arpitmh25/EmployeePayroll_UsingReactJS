import React from "react";
import "./Display.css";
import { useState, useEffect } from 'react';
import { getUsers, deleteUser } from "../../Service/api";
import deleteIcon from "../../Assets/icons/delete-black-18dp.svg";
import editIcon from "../../Assets/icons/create-black-18dp.svg";
import profile1 from "../../Assets/profile-images/Ellipse -3.png";
import profile2 from "../../Assets/profile-images/Ellipse -1.png";
import profile3 from "../../Assets/profile-images/Ellipse -2.png";
import profile4 from "../../Assets/profile-images/Ellipse -4.png";
import { Link } from 'react-router-dom';



const Display = (props) => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const response = await getUsers();
    console.log("User Data ", response.data);
    setUsers(response.data.data);
  }
  const deleteUserData = async (id) => {
    await deleteUser(id);
    getAllUsers();
  }


  let employeeList = JSON.parse(localStorage.getItem('EmployeeList'));
  console.log(employeeList);

  return (
    <table id="display" className="display">
      <thead>

        <tr key={-1}>
          <th>Profile Image</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Departments</th>
          <th>Salary</th>
          <th>Start Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {

          users.map(user => (
            <tr key={user.employeeId}>
              <td><img className="profile"
                src={
                  user.profilePic ===
                    "../../assets/profile-images/Ellipse -3.png"
                    ? profile1
                    : user.profilePic ===
                      "../../assets/profile-images/Ellipse -1.png"
                      ? profile2
                      : user.profilePic ===
                        "../../assets/profile-images/Ellipse -4.png"
                        ? profile3
                        : profile4
                }
                alt=""
              />
              </td>
              <td>{user.name}</td>
              <td className="gender">{user.gender}</td>
              <td>
                {user.departments &&
                  user.departments.map(dept => (
                    <div className="dept-label">{dept}</div>
                  ))}
              </td>
              <td> ₹ {user.salary}</td>
              <td>{user.startDate}</td>
              <td>
                <img src={deleteIcon} alt="delete" onClick={() => deleteUserData(user.id)} />
                <Link to={`/edit/${user.id}`}>
                  <img src={editIcon} alt="edit" />
                </Link>

              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default Display; 