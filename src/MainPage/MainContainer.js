import React from "react";
import {connect} from "react-redux";

import CanvasComponent from "./CanvasComponent";
import ResultTable from "./ResultTable";

class MainContainer extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.user === null) this.props.history.push("/login");
        else this.props.dispatch({type: "APP_GET_POINTS", value: {history: this.props.history}})

    }
    handleSubmit(){
        let date = new Date()
        let utcDate=date.toUTCString()
        this.props.dispatch({
            type: "MAIN_ADD_POINT",
            value: {x: this.props.x, y: this.props.y, r: this.props.r,currtime: utcDate}
        })
    }

    render() {
        return (
            <div className="main">
                <br/>
                <h2 id="hello">Hello, {this.props.user}. Check your points here!</h2>
                <CanvasComponent/>

                <h2>Choose X:</h2>
                <input type="text" value={this.props.x} maxLength={5} placeholder="      от -5 до 5"
                       onChange={event => this.props.dispatch({
                           type: "MAIN_SET_X",
                           value: event.target.value.replace(",", ".")
                       })}/>
                <h2>Choose Y:</h2>
                <input type="text" value={this.props.y} placeholder="      от -5 до 3"
                       onChange={event => this.props.dispatch({
                           type: "MAIN_SET_Y",
                           value: event.target.value.replace(",", ".")
                       })}/>
                <h2>Choose R:</h2>
                <input type="text" value={this.props.r} placeholder="      от 0 до 5" maxLength={3}
                       onChange={event => this.props.dispatch({
                           type: "MAIN_SET_R",
                           value: event.target.value.replace(",", ".")
                       })}/>

                <br/>
                <button className="submit-button" onClick={() =>this.handleSubmit()} disabled={this.props.y === "" || this.props.y === "-" || this.props.y === "."||this.props.x === "" || this.props.x === "-" || this.props.x === "."}>Check
                </button>
                <button className="submit-button" onClick={this.exit}>Logout</button>
                <br/>
                <ResultTable/>

            </div>
        )
    }

    exit = () => {
        this.props.dispatch({type: "APP_LOGOUT", value: {history: this.props.history}});
    }
}

const mapStateToProps = function (store) {
    return {
        user: store.appState.user,
        x: store.mainState.xField,
        y: store.mainState.yField,
        r: store.mainState.rField,
    }
};

export default connect(mapStateToProps)(MainContainer);