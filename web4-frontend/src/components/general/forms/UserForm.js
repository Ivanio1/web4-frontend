import React, {Component, useEffect, useState} from 'react';
import "../../../styles/userForm.css"
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";


const UserForm = (props) => {
    const [isLog,setIsLog]=useState(false)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loginDirty, setLoginDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [loginError, setLoginError] = useState("Логин не может быть пустым")
    const [passwordError, setPasswordError] = useState("Пароль не может быть пустым")
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        Cookies.set('is-logged-in', 'false');

        if (loginError === "" && passwordError === "") {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    })

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'login':
                setLoginDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }

    }

    const loginHandler = (e) => {
        setLogin(e.target.value)
        const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;
        if (cyrillicPattern.test(String(e.target.value).toLowerCase())) {
            setLoginError("Русский алфавит не поддерживается")
        } else {
            setLoginError("")
        }
        if (e.target.value.length < 1) {
            setLoginError("Логин не может быть пустым")
        }


    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;
        if (cyrillicPattern.test(String(e.target.value).toLowerCase())) {
            setPasswordError("Русский алфавит не поддерживается")
        } else {
            setPasswordError("")
        }
        if (e.target.value.length < 1) {
            setPasswordError("Пароль не может быть пустым")
        }

    }


    const myContext=React.createContext();
    function sendRegRequest() {
        let login2 = document.getElementById("login").value.toString()
        let password2 = document.getElementById("password").value.toString()
        fetch('http://localhost:8080/register', {
            method: 'POST',
            body: [login2, password2]
        })
            .then(function (response) {
                return response.text();
            }).then(function (data) {
            let json = JSON.parse(data)
            let status = json.status
            let answer = json.answer
            let rezult = document.getElementById("message")
            if(status===200){
                rezult.innerHTML = '<span style="color:green;">' + answer + '</span>';
                Cookies.set('is-logged-in', 'true');

            }
            else{
                rezult.innerHTML = '<span style="color:blue;">' + answer + '</span>';
            }

            if (status === 200) {
                setTimeout(function () {
                    navigate('/main')
                }, 3000)
            }
        });


    }

    function sendAuthRequest() {
        let login2 = document.getElementById("login").value.toString()
        let password2 = document.getElementById("password").value.toString()
        fetch('http://localhost:8080/signIn', {
            method: 'POST',
            body: [login2, password2]
        })
            .then(function (response) {
                return response.text();
            }).then(function (data) {
            let json = JSON.parse(data)
            let status = json.status
            let answer = json.answer
            let rezult = document.getElementById("message")
            if(status===200){
                rezult.innerHTML = '<span style="color:green;">' + answer + '</span>';

            }
            else{
                rezult.innerHTML = '<span style="color:blue;">' + answer + '</span>';
            }
            if (status === 200) {
                rezult.setAttribute("style", "color: green")
                setTimeout(function () {
                    Cookies.set('is-logged-in', 'true');
                    navigate('/main')
                }, 3000)
            }
        });

    }

    const navigate = useNavigate();//onClick={() => navigate('/register')}




    return (
        <div className="userForm" id="shadow">
            <div id="forma"><br/>
                <h1><strong>Войдите или зарегистрируйтесь в системе!</strong></h1>
                <div className="login"><label><strong>Login: </strong></label>
                    {(loginDirty && loginError) && <div style={{color: 'red'}}>{loginError}</div>}
                    <input id="login" name="login" value={login} onChange={e => loginHandler(e)}
                           onBlur={e => blurHandler(e)} placeholder="Логин(до 25 символов)" type="text" maxLength={25}
                    />
                </div>
                <br/>
                <div className="password"><label><strong>Password: </strong></label>
                    {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
                    <input id="password" value={password} name="password" onChange={e => passwordHandler(e)}
                           onBlur={e => blurHandler(e)} placeholder="Пароль(до 15 символов)" maxLength={15}
                           type="password"
                    />
                </div>

                <div className="form-buttons">
                    <button className="pass-button" disabled={!formValid} type="button" onClick={sendAuthRequest}
                    >Войти
                    </button>
                    <button className="reg-button" disabled={!formValid} type="button"
                            onClick={sendRegRequest}>Регистрация
                    </button>
                </div>
                <div id="message"></div>
            </div>

        </div>
    );
}


export default UserForm;