import {createStore} from 'redux';
import reducers from './reducers';
import middleware from "./middlewares/middlewares";

const initialState = {
    appState: {
        user: window.localStorage.getItem("user"),
        points: [],
        drawing: [],
        totalPages:0,
        currentPage:1
    },
    loginState: {
        login: "",
        password: "",
        error: false,
        formCorrect: false
    },
    registerState: {
        login: "",
        password: "",
        rPassword: "",
        loginError: false,
        passwordError: false,
        formCorrect: false
    },
    mainState: {
        xField: "",
        yField: "",
        rField: 5,
        xChange: "",
        yChange: "",
        currentPoint: 0
    }
};

const store = createStore(reducers, initialState, middleware);

export default store;