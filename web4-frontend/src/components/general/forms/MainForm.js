import React, {Component, useEffect, useState} from 'react';
import "../../../styles/mainForm.css"
import {useDispatch, useSelector} from "react-redux";
import PointsService from "../PointsService";
import Table from "../Table";

const MainForm = (props) => {

    const dispatch = useDispatch();
    const R = useSelector(state => state.r);
    const X = useSelector(state => state.x);
    const Y = useSelector(state => state.y);

    const [x, setX] = useState('')
    const [y, setY] = useState('')
    const [r, setR] = useState('')
    const [xDirty, setXDirty] = useState(false)
    const [yDirty, setYDirty] = useState(false)
    const [rDirty, setRDirty] = useState(false)
    const [xError, setXError] = useState("X не может быть пустым")
    const [yError, setYError] = useState("Y не может быть пустым")
    const [rError, setRError] = useState("R не может быть пустым")
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (xError === "" && yError === "" && rError === "") {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    })


    function sendCoords() {
        let date = new Date();
        let utcDate = date.toUTCString()
        fetch('http://localhost:8080/add', {
            method: 'POST',
            body: [x, y, r, utcDate]
        })
    }
    function sendDelete() {
        fetch('http://localhost:8080/delete')

    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'x_value':
                setXDirty(true)
                break
            case 'y_value':
                setYDirty(true)
                break
            case 'r_value':
                setRDirty(true)
                break
        }

    }

    const xHandler = (e) => {
        setX(e.target.value)
        const cyrillicPattern = /[^0-9\.\-]/g;
        if (cyrillicPattern.test(String(e.target.value).toLowerCase())) {
            setXError("Можно ввести только цифры")
        } else {
            setXError("")
        }
        if (e.target.value.length < 1) {
            setXError("X не может быть пустым")
        }
        if (e.target.value < -5 || e.target.value > 5) {
            setXError("X от -5 до 5")
        }


    }

    const yHandler = (e) => {
        setY(e.target.value)
        const cyrillicPattern = /[^0-9\.\-]/g;
        if (cyrillicPattern.test(String(e.target.value).toLowerCase())) {
            setYError("Можно ввести только цифры")
        } else {
            setYError("")
        }
        if (e.target.value.length < 1) {
            setYError("Y не может быть пустым")
        }
        if (e.target.value < -5 || e.target.value > 3) {
            setYError("Y от -5 до 3")
        }


    }
    const rHandler = (e) => {
        setR(e.target.value)
        const cyrillicPattern = /[^0-9\.]/g;
        if (cyrillicPattern.test(String(e.target.value).toLowerCase())) {
            setRError("Можно ввести только цифры")
        } else {
            setRError("")
        }
        if (e.target.value.length < 1) {
            setRError("R не может быть пустым")
        }
        if (e.target.value <= 0 || e.target.value > 5) {
            setRError("R от 0 до 5")
        }


    }
    const SetR = (e) => {
        let Rval = e.target.value;
        if (Rval > 0 && Rval <= 5) {
            dispatch({type: "SET_R", payload: Rval})
        }
    }
    const SetX = (e) => {
        let Xval = e.target.value;
        if (Xval >= -5 && Xval <= 5) {
            dispatch({type: "SET_X", payload: Xval})
        }
    }
    const SetY = (e) => {
        let Yval = e.target.value;
        if (Yval >= -5 && Yval <= 3) {
            dispatch({type: "SET_Y", payload: Yval})
        }
    }


    return (
        <div>

            <div className="form-input-x"><label><strong>X: </strong></label>
                {(xDirty && xError) && <div style={{color: 'red'}}>{xError}</div>}
                <input id="x-value-select" maxLength="5" value={x} name="x_value" placeholder="-5 ... 5" type="text"
                       onBlur={e => blurHandler(e)} onChange={e => {
                    xHandler(e);
                    SetX(e)
                }}
                />
            </div>
            <br/>
            <div className="form-input-y"><label><strong>Y: </strong></label>
                {(yDirty && yError) && <div style={{color: 'red'}}>{yError}</div>}
                <input id="y-value-select" maxLength="5" value={y} name="y_value" placeholder="-5 ... 3" type="text"
                       onBlur={e => blurHandler(e)} onChange={e => {
                    yHandler(e);
                    SetY(e)
                }}
                />
            </div>
            <br/>
            <div className="form-input-r"><label htmlFor="r-value-select"><strong>R: </strong></label>
                {(rDirty && rError) && <div style={{color: 'red'}}>{rError}</div>}
                <input id="r-value-select" maxLength="4" value={r} name="r_value" placeholder="0 ... 5" type="text"
                       onBlur={e => blurHandler(e)} onChange={e => {
                    rHandler(e);
                    SetR(e);
                }}
                />
            </div>
            <br/>
            <form>
                <div className="form-buttons">
                    <button className="check-button" id="submitButton" disabled={!formValid} type="submit"
                            onClick={sendCoords}>Проверить
                    </button>
                    <button className="clear-button" id="modalButton"  type="submit"
                            onClick={sendDelete}>Очистить</button>
                </div>
            </form>


            <div id="myinp"></div>
        </div>
    );

}

export default MainForm;