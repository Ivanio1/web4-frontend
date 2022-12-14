import React from "react";
import {connect} from "react-redux";

class RegisterContainer extends React.Component {
    render() {
        return (
            <div className="main">
                <br/>
                <h1>Registration</h1>
                <h2>Username:</h2>
                <input type="text" value={this.props.login}
                       onChange={event => this.props.dispatch({
                           type: "REGISTER_SET_LOGIN",
                           value: event.target.value.replace(" ", "")
                       })}/>
                <div className={!this.props.loginError ? 'hidden' : 'warn'}>
                    This username is already taken
                </div>
                <h2>Password:</h2>
                <input type="password" value={this.props.password}
                       onChange={event => this.props.dispatch({
                           type: "REGISTER_SET_PASSWORD",
                           value: event.target.value
                       })}/>
                <h2>Repeat password:</h2>
                <input type="password" value={this.props.rPassword}
                       onChange={event => this.props.dispatch({
                           type: "REGISTER_SET_R_PASSWORD",
                           value: event.target.value
                       })}/><br/>
                <div className={!this.props.passwordError ? 'hidden' : 'warn'}>
                    Make sure that the password and its confirmation match
                </div>
                <button className="submit-button" onClick={this.register}
                        disabled={!this.props.formCorrect}>Confirm
                </button>
                <button className="submit-button" onClick={this.redirectToLogin}>Back</button>
            </div>
        )
    }

    redirectToLogin = () => {
        this.props.history.push("/login")
    };

    register = () => {
        this.props.dispatch({type: "APP_REGISTER", value: {history: this.props.history}})
    };
}

const mapStateToProps = function (store) {
    return {
        user: store.appState.user,
        login: store.registerState.login,
        password: store.registerState.password,
        rPassword: store.registerState.rPassword,
        passwordError: store.registerState.passwordError,
        loginError: store.registerState.loginError,
        formCorrect: store.registerState.formCorrect
    }
};

export default connect(mapStateToProps)(RegisterContainer);