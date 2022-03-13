import React, { Component } from 'react';
import './PayrollHome.css';
import logo from "../../Assets/images/logo.png";
import addImage from "../../Assets/icons/add-24px.svg";
import { Link } from "react-router-dom";

import Display from './DisplayForm';

//Created Header for Employee Payroll
export class PayrollHome extends Component {
    render() {
        return (
            <div>
                <div>
                    <header className="header-content header">
                        <div className="logo-content">
                            <img src={logo} alt="logo" />
                            <div>
                                <span className="emp-text">EMPLOYEE</span><br />
                                <span className="emp-text emp-payroll">PAYROLL</span>
                            </div>
                        </div>
                    </header>
                    <div className="main-content">
                        <div className="header-content sub-main-content">
                            <div className="emp-details-text">
                                Employee Details
                                <div className="emp-count"></div>
                            </div>
                         
                            <Link className="add-btn" to="/addemployee">
                                <img src={addImage} alt="Add user" />
                                <div>Add User</div></Link>

                        </div>
                        <div className="table-main">
                            <Display />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default PayrollHome
