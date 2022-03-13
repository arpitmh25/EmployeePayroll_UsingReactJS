import axios from 'axios';

//const usersUrl = 'http://localhost:3003/EmployeePayrollDB';
const usersUrl = 'http://localhost:8080/employeepayrollservice'

//Performing Api calls

export const getUsers = async(id) => {
    id = id || '';
    return await axios.get(`${usersUrl}/get/${id}`);
}
export const addUser = async(user) => {
    return await axios.post(`${usersUrl}/create`, user);
}
export const deleteUser = async(id) => {
    return await axios.delete(`${usersUrl}/delete/${id}`);
}
export const edituser = async(id, user) => {
    return await axios.put(`${usersUrl}/update/${id}`, user)
}