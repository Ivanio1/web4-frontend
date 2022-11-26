import React, {Component,useEffect, useState} from 'react';
import "../../styles/table.css"
import PointsService from "./PointsService";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            points: []
        }
    }


    render() {
        PointsService.getPoints().then((response) => {
            this.setState({points: response.data})
        })
        return (
            <div>
                <table className={"result-table"}>
                    <thead>
                    <tr>
                        <th width="77px">X</th>
                        <th width="77px">Y</th>
                        <th width="60px">R</th>
                        <th width="90px">Result</th>
                        <th width="198px">Current Time</th>
                        <th width="132px">Execution Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.points.map(
                            point =>
                                <tr key={point.id}>
                                    <td>{point.x}</td>
                                    <td>{point.y}</td>
                                    <td>{point.r}</td>
                                    <td>{point.checked}</td>
                                    <td>{convertDate(point.currtime)}</td>
                                    <td>{point.extime}</td>

                                </tr>
                        )

                    }


                    </tbody>

                </table>
            </div>
        );
    }
}

function convertDate(date) {
    let newdate = new Date(date)
    let day=newdate.getDate()>=10?newdate.getDate():"0"+newdate.getDate()
    let month=newdate.getMonth() + 1
    let year=newdate.getFullYear()
    let hours=newdate.getHours()>=10?newdate.getHours():"0"+newdate.getHours()
    let minutes=newdate.getMinutes()>=10?newdate.getMinutes():"0"+newdate.getMinutes()
    let seconds=newdate.getSeconds()>=10?newdate.getSeconds():"0"+newdate.getSeconds()
    return day + "-" + month + "-" + year+ " " + hours + ":" + minutes + ":" + seconds
}

export default Table;