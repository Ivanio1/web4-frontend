import LogInPage from "./components/pages/LogInPage";
import './styles/header.css'
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import ErrorPage from "./components/pages/ErrorPage";

import MainPage from "./components/pages/MainPage";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";


function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<LogInPage />}/>
                    <Route exact path="/main" element={<MainPage />}/>
                    <Route exact path="*" element={<ErrorPage />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
