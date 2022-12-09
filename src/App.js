import React from 'react';
import {Router, Route} from "react-router-dom";
import "./style.scss"
import LoginPage from "./LoginPage/LoginPage";
import MainPage from "./MainPage/MainPage";
import RegisterPage from "./RegisterPage/RegisterPage";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Router>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/register" component={RegisterPage}/>
                    <Route path="/" component={MainPage}/>
                </Router>
            </div>
        );
    }
}

const Header = () => {
    return (
        <div className="head">
            <span id="head-title">
                Лабораторная работа №4 Вариант 1306
            </span>
            <br/>
            <span id="head-author">
                Соболев Иван P32312
            </span>
        </div>
    )
};

export default App;
