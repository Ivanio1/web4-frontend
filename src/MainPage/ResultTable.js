import React from "react";
import {connect} from "react-redux";
import _ from 'lodash'
import Cookies from "js-cookie";

class ResultTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentpage: Number(Cookies.get("p")),
            paginatedPoints: [],
            count: 1
        };
    }


    render() {
        let result = [];
        let points = this.props.points;

        const pageCount = this.props.totalPages
        const pages = _.range(1, pageCount + 1)
        Cookies.set("p", this.state.currentpage)
        Cookies.set("lp", pageCount)
        for (let item of points) {
            let history = item;
            result.push(
                <tr key={item.id}>
                    <td>{history.x}</td>
                    <td>{history.y}</td>
                    <td>{item.r}</td>
                    <td>{`${history.checked}`}</td>
                    <td>{convertDate(item.currtime)}</td>
                    <td>{item.extime}</td>
                    <td>{this.deleteButton(item)}</td>
                </tr>
            )
        }
        return (
            <div>
                <nav className="d-flex justify-content-center">
                    <ul className="pagination">
                        {
                            pages.map((page) => (
                                <li key={page} className={
                                    page === this.state.currentpage ? "page-item active" : "page-item"
                                }>
                                    <button className="page-link"
                                            onClick={() => {
                                                this.setState({currentpage: page})
                                                window.location.reload();
                                            }}
                                    >{page}</button>
                                </li>
                            ))
                        }

                    </ul>
                </nav>
                <table className="result-table">
                    <thead className="thead">
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Result</th>
                        <th>Time</th>
                        <th>Execution</th>
                        <th>Change</th>
                    </tr>
                    </thead>
                    <tbody>{result}</tbody>
                </table>
                <br/>

            </div>

        )
    }

    deleteButton = (item) => (<button className="r-button" onClick={event => {
        this.props.dispatch({type: "MAIN_DELETE_POINT", value: item})
        window.location.reload();
    }}>Delete</button>);

}


function convertDate(date) {
    let newdate = new Date(date)
    let day = newdate.getDate() >= 10 ? newdate.getDate() : "0" + newdate.getDate()
    let month = newdate.getMonth() + 1
    let year = newdate.getFullYear()
    let hours = newdate.getHours() >= 10 ? newdate.getHours() : "0" + newdate.getHours()
    let minutes = newdate.getMinutes() >= 10 ? newdate.getMinutes() : "0" + newdate.getMinutes()
    let seconds = newdate.getSeconds() >= 10 ? newdate.getSeconds() : "0" + newdate.getSeconds()
    return day + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds
}

const mapStateToProps = function (store) {
    return {
        points: store.appState.points,
        currentPoint: store.mainState.currentPoint,
        x: store.mainState.xChange,
        y: store.mainState.yChange,
        totalPages: store.appState.totalPages,
        currentPage: store.appState.currentPage
    }
};

export default connect(mapStateToProps)(ResultTable)