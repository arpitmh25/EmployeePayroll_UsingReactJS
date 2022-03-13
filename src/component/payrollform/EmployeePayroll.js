import React, { useState, useEffect } from 'react';
import profile1 from '../../Assets/profile-images/Ellipse -3.png';
import profile2 from '../../Assets/profile-images/Ellipse -1.png';
import profile3 from '../../Assets/profile-images/Ellipse -8.png';
import profile4 from '../../Assets/profile-images/Ellipse -7.png';
import './PayrollForm.css';
import { addUser } from "../../Service/api";
import logo from '../../Assets/images/logo.png'
import { Link } from 'react-router-dom';

//Created Employee payroll and use function and state hook to perform operations
const initialValue = {
    "name": '',
    "gender": '',
    "departments": [],
    "salary": '',
    "startDate": '',
    "notes": '',
    "profilePic": ''
}

const EmployeePayroll = (props) => {

    const [user, setUser] = useState(initialValue);
    const [date, setDate] = useState([]);

    const { name, gender, departments, salary, startDate, note, profilePic } = user;

    let employeeList = {
        name: '',
        profileArray: [
            { url: '../../assets/profile-images/Ellipse -3.png' },
            { url: '../../assets/profile-images/Ellipse -1.png' },
            { url: '../../assets/profile-images/Ellipse -8.png' },
            { url: '../../assets/profile-images/Ellipse -7.png' }

        ],
        allDepartment: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        departMentValue: [],
        gender: '',
        salary: '',
        day: '',
        month: '',
        year: '',
        startDate: '',

        notes: '',
        id: '',
        profilePic: '',
    }
    const [formValue, setForm] = useState(employeeList);



    useEffect(() => {
        localStorage.setItem('formValue', JSON.stringify(formValue));
    }, [formValue]);


    const changeValue = (event) => {

        setForm({ ...formValue, [event.target.name]: event.target.value })
        setUser({ ...user, [event.target.name]: event.target.value })



    }
    const addUserDetails = async () => {
        await addUser(user);
        console.log(formValue.startDate)

    }

    const onCheckChange = (name) => {
        let index = formValue.departMentValue.indexOf(name);

        let checkArray = [...formValue.departMentValue]
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        setForm({ ...formValue, departMentValue: checkArray });
        setUser({ ...user, departments: checkArray })
    }

    const getChecked = (name) => {
        return formValue.departMentValue && formValue.departMentValue.includes(name);
    }

    const save = (event) => {
        event.preventDefault();

        let employeeObject = {
            name: formValue.name,
            departments: formValue.departMentValue,
            gender: formValue.gender,
            salary: formValue.salary,
            startDate: formValue.startDate,
            notes: formValue.notes,
            id: createNewEmployeeId(),
            profilePic: formValue.profilePic,
        };
        console.log(employeeObject)
        localStorage.setItem('EmployeeList', JSON.stringify(employeeObject));
    };

    const createNewEmployeeId = () => {
        let empID = localStorage.getItem("EmployeeID");
        empID = !empID ? 1 : (parseInt(empID) + 1).toString();
        localStorage.setItem("EmployeeID", empID);
        return empID;
    }


    const reset = () => {
        setForm({ ...employeeList, id: formValue.id, isUpdate: formValue.isUpdate });


    }

    return (
        <div className="payroll-main">
            <header className='header-content header'>
                <div className="logo-content">
                    <img src={logo} alt="" />
                    <div>
                        <span className="emp-text">EMPLOYEE</span> <br />
                        <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
            </header>
            <div className="form-content">
                <form className="form-head" action="#" onSubmit={save}>
                    <div className="form-head">Employee Payroll form</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="name">Name</label>
                        <input className="input" type="text" id="name" name='name' value={formValue.name} onChange={(event) => changeValue(event)} placeholder="Your name.." />
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="profilePic">Profile image</label>
                        <div className="profile-radio-content">
                            <label >
                                <input type="radio" name='profilePic' checked={formValue.profilePic === '../../assets/profile-images/Ellipse -1.png'} value="../../assets/profile-images/Ellipse -1.png" onChange={(event) => changeValue(event)} />
                                <img className="profile" src={profile2} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name='profilePic' checked={formValue.profilePic === '../../assets/profile-images/Ellipse -3.png'} value="../../assets/profile-images/Ellipse -3.png" onChange={(event) => changeValue(event)} />
                                <img className="profile" src={profile1} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name='profilePic' checked={formValue.profilePic === '../../assets/profile-images/Ellipse -7.png'} value="../../assets/profile-images/Ellipse -7.png" onChange={(event) => changeValue(event)} />
                                <img className="profile" src={profile4} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name='profilePic' checked={formValue.profilePic === '../../assets/profile-images/Ellipse -8.png'} value="../../assets/profile-images/Ellipse -8.png" onChange={(event) => changeValue(event)} />
                                <img className="profile" src={profile3} alt="profile" />
                            </label>

                        </div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="gender">Gender</label>
                        <div>
                            <input type="radio" id="male" checked={formValue.gender === 'male'} onChange={(event) => changeValue(event)} name='gender' value="male" />
                            <label className="text" htmlFor="male">Male</label>
                            <input type="radio" id="female" checked={formValue.gender === 'female'} onChange={(event) => changeValue(event)} name='gender' value="female" />
                            <label className="text" htmlFor="female">Female</label>
                        </div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="departments">Department</label>
                        <div>
                            {formValue.allDepartment.map(item => (
                                <span key={item}>
                                    <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                                        checked={getChecked(item)} value={item} />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            ))}

                        </div>
                    </div>

                    <div className="row-content">
                        <label className="label text" htmlFor="salary">Salary</label>
                        <input className="input" type="text" id="salary" name='salary' value={formValue.salary} onChange={(event) => changeValue(event)} />
                    </div>

                    <div className="row-content">
                        <label class="label text" for="startDate">StartDate</label>
                        <div class="row-content"> <label class="label-text" for="startDate" /> <input type="date" class="startDate" id="startDate" value={formValue.startDate} onChange={(event) => changeValue(event)} name="startDate" required /> </div>
                    </div>

                    <div className="row-content">
                        <label className="label text" htmlFor="notes">Notes</label>
                        <textarea onChange={(event) => changeValue(event)} id="notes" value={formValue.notes} className="input" name='notes' placeholder=""
                            style={{ height: '120%' }}></textarea>
                    </div>

                    <div className="buttonParent">
                        <Link to="/" className="resetButton button cancelButton">Cancel</Link>
                        <Link to="/" className="resetButton button cancelButton">Employee List</Link>

                        <div className="submit-reset">

                            <button type="submit" onClick={() => addUserDetails()} className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                            <button type="button" onClick={reset} className="resetButton button">Reset</button>
                        </div>
                    </div >
                </form >
            </div >
        </div >
    );
}
export default EmployeePayroll;