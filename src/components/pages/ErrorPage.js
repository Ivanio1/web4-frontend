import React, {Component} from 'react';
import Header from "../general/Header";

class ErrorPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <h1>Что-то пошло не так!</h1>
            </div>
        );
    }
}

export default ErrorPage;