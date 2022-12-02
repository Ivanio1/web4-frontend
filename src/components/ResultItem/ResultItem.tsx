import * as React from 'react';
import {FC} from "react";
import {IPoint} from "../../models/IPoint";

interface ResultItemProps {
    point: IPoint;
}

const ResultItem: FC<ResultItemProps> =  (props) => {
    function convertDate(date: string | number | Date) {
        let newdate = new Date(date)
        let day=newdate.getDate()>=10?newdate.getDate():"0"+newdate.getDate()
        let month=newdate.getMonth() + 1
        let year=newdate.getFullYear()
        let hours=newdate.getHours()>=10?newdate.getHours():"0"+newdate.getHours()
        let minutes=newdate.getMinutes()>=10?newdate.getMinutes():"0"+newdate.getMinutes()
        let seconds=newdate.getSeconds()>=10?newdate.getSeconds():"0"+newdate.getSeconds()
        return day + "-" + month + "-" + year+ " " + hours + ":" + minutes + ":" + seconds
    }
    return (
        <tr>
            <td>{props.point.x}</td>
            <td>{props.point.y}</td>
            <td>{props.point.r}</td>
            <td>{String(props.point.hit)}</td>
            <td>{convertDate(props.point.currtime)}</td>
            <td>{props.point.extime}</td>
        </tr>
    );
};


export default ResultItem;