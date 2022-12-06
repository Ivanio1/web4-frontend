import React from "react";
import {connect} from "react-redux";
import _ from 'lodash'

class ResultTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentpage: 1,
            paginatedPoints: [],
            count: 1
        };
    }


    render() {
        let result = [];
        let points = this.props.points;
        const pageSize = 5
        const pageCount = points ? Math.ceil(points.length / pageSize) : 0
        const pages = _.range(1, pageCount + 1)
        let paginatedPoints = points.slice(0, pageSize)
        const startIndex = (this.state.currentpage - 1) * pageSize
        paginatedPoints = points.slice(startIndex, startIndex + pageSize)

        for (let item of paginatedPoints) {
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
            // <div className="container">
            <div>
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
                <nav className="d-flex justify-content-center">
                    <ul className="pagination">
                        {
                            pages.map((page) => (
                                <li key={page} className={
                                    page === this.state.currentpage ? "page-item active" : "page-item"
                                }>
                                    <button className="page-link"
                                       onClick={() => this.setState({currentpage: page})}
                                    >{page}</button>
                                </li>
                            ))
                        }

                    </ul>
                </nav>
            </div>

        )
    }

    deleteButton = (item) => (<button className="r-button" onClick={event => {
        this.props.dispatch({type: "MAIN_DELETE_POINT", value: item})
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
        y: store.mainState.yChange
    }
};

export default connect(mapStateToProps)(ResultTable)