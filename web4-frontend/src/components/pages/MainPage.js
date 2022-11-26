import React, {Component, useEffect} from 'react';
import Header from "../general/Header";
import Table from "../general/Table";
import Graph from "../general/Graph";
import '../../styles/main.css'
import MainForm from "../general/forms/MainForm";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const MainPage = (props) => {
    const navigate = useNavigate();
    let flag=Cookies.get('is-logged-in');
    useEffect(() => {
        if(flag!=='true'){
            navigate('/')
        }

    })


     return (
        <div>
            <Header/>
            <div className="page">
                <div className='table'><Table/></div>
                <div className='graph'><br/><br/><br/><Graph/></div>
                <div className="form"><br/><br/><br/><MainForm/></div>

            </div>

        </div>
    );
}

export default MainPage;