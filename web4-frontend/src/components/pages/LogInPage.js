import React, {Component} from 'react';
import Header from "../general/Header";
import {useNavigate} from 'react-router-dom';
import UserForm from "../general/forms/UserForm";
import "../../styles/loginPage.css"


const LogInPage = (props) => {
    return (
        <div>
            <Header />
            <br/><br/>
            <div className="wrapper">
                <div className="leftt"> </div>
                <div className="form"><br/><br/><br/><br/><UserForm/></div>
            </div>


        </div>
    );
};
export default LogInPage;