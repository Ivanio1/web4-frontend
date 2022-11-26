import React, {Fragment, useEffect} from 'react';
import "../../styles/graph.css"
import {useSelector} from "react-redux";
import $ from 'jquery';
import {set, setIn} from "immutable";

const Graph = (props) => {
    drawPointsFromTable()
    useEffect(() => {
        return () => {
            drawPointsFromTable()
        };
    }, []);

    const R = useSelector(state => state.r)

    function getXFromSVG(x, r) {
        return ((x - 150) / 60 / 2 * r) - 0.05*r;
    }

    function getYFromSVG(y, r) {
        return ((y - 150) / 60 / 2 * -r) + 0.934*r;
    }

    function clickPlotHandler(e) {
        let x = e.pageX
        let y = e.pageY
        let xValue = getXFromSVG(x, R).toFixed(2);
        let yValue = getYFromSVG(y, R).toFixed(2);
        let date = new Date();
        let utcDate = date.toUTCString()
        fetch('http://localhost:8080/add', {
            method: 'POST',
            body: [xValue, yValue, R, utcDate]
        }).then(setTimeout(function e() {
            drawPointsFromTable()
        },1000))

    }


    function drawPointsFromTable() {
        $("tbody tr").each(function () {
            let point = $(this);
            let x = parseFloat(point.find(">:first-child").text());
            let y = parseFloat(point.find(">:nth-child(2)").text());
            let r = parseFloat(point.find(">:nth-child(3)").text());
            let result = point.find(">:nth-child(4)").text().trim() === "true";

            if (isNaN(x) || isNaN(y) || isNaN(r)) {
                return;
            }
            let color;
            color = result ? "green" : "red";

            function xValueForPoint(x) {
                return (x / r * 2 * 60 + 150)
            }

            function yValueForPoint(y) {
                return (-y / r * 2 * 60 + 150)
            }

            let plot = $("svg")

            let existingPlot = plot.html()
            let newPlot = `<circle id="pointer" r="5" cx="${xValueForPoint(x)}" cy="${yValueForPoint(y)}" fill-opacity="0.7" fill="${color}" stroke="firebrick" visibility="visible"></circle>`
            plot.html(existingPlot + newPlot)
        })
    }


    return (
        <div>
            <div className="graphic">
                <Fragment>
                    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" id="svg"
                         onClick={clickPlotHandler}>
                        <line x1="0" y1="150" x2="300" y2="150" stroke="#000720"></line>
                        <line x1="150" y1="0" x2="150" y2="300" stroke="#000720"></line>
                        <line x1="270" y1="148" x2="270" y2="152" stroke="#000720"></line>
                        <text x="265" y="140">{R}</text>
                        <line x1="210" y1="148" x2="210" y2="152" stroke="#000720"></line>
                        <text x="200" y="140">{R / 2}</text>
                        <line x1="90" y1="148" x2="90" y2="152" stroke="#000720"></line>
                        <text x="75" y="140">-{R / 2}</text>
                        <line x1="30" y1="148" x2="30" y2="152" stroke="#000720"></line>
                        <text x="20" y="140">-{R}</text>
                        <line x1="148" y1="30" x2="152" y2="30" stroke="#000720"></line>
                        <text x="156" y="35">{R}</text>
                        <line x1="148" y1="90" x2="152" y2="90" stroke="#000720"></line>
                        <text x="156" y="95">{R / 2}</text>
                        <line x1="148" y1="210" x2="152" y2="210" stroke="#000720"></line>
                        <text x="156" y="215">{-R / 2}</text>
                        <line x1="148" y1="270" x2="152" y2="270" stroke="#000720"></line>
                        <text x="156" y="275">-{R}</text>
                        <polygon points="300,150 295,155 295, 145" fill="#000720" stroke="#000720"></polygon>
                        <polygon points="150,0 145,5 155,5" fill="#000720" stroke="#000720"></polygon>

                        <rect className="rectangle" x="150" y="30" width="120" height="120"></rect>

                        <polygon className="triangle" points="150,150 270,150 150,270"></polygon>

                        <path className="quarter"
                              d="M 150 90 A 60 60, 90, 0, 0, 90 150 L 150 150 Z"></path>

                        <circle id="pointer" r="5" cx="150" cy="150" fillOpacity="0.7" fill="white" stroke="firebrick"
                                visibility="hidden"></circle>
                    </svg>
                </Fragment>

            </div>
        </div>

    );

}

export default Graph;