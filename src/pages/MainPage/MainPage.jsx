import React, {useEffect, useState} from 'react';
import LabHeader from "../../components/LabHeader/LabHeader";
import {useHistory} from "react-router-dom";
import {Button} from "@yandex/ui/Button";
import Graph from "../../components/Graph/Graph";
import classes from "./MainPage.module.css";
import PointParamsPanel from "../../components/PointParamsPanel/PointParamsPanel";
import ResultContainer from "../../components/ResultContainer/ResultContainer";
import {useAppSelector} from "../../hooks/redux";
import logout from "../../static/free-icon-undo-7168662.png";

const MainPage = () => {
    const history = useHistory();
    let jwt = localStorage.getItem("authToken");
    let [authSuccess, setAuthSuccess] = useState(false);
    let radius = useAppSelector(state => state.point.r);

    useEffect(() => {
        document.title = "Main Page"
    } )

    function signOut() {
        localStorage.setItem("authToken", "");
        history.push("/");
    }

    function onCanvasClick() {
        console.log("qwe");
    }


    return (
        <div>
            {jwt !== "" && {authSuccess} ?
                <div>
                    <LabHeader midtext="Main page"/>

                    <br/>
                    <div className={classes.input}>

                        <div className={classes.input_left}>
                            <div className={classes.canvasGraph}>
                                <Graph id={"canvas-graph"} onClick={onCanvasClick} radius={radius}/>
                            </div>
                        </div>
                        <div className={classes.input_right}>
                            <ResultContainer/>
                        </div>
                        <div className={classes.input_center}>
                            <PointParamsPanel/>
                        </div>
                    </div>
                    <a href="/" onClick={signOut}>
                        <img src={logout} title="Logout" alt="Logout" height="50px"/>
                    </a>
                </div>
                : <h1 style={{textAlign: "center"}}>Unauthorized</h1>
            }
        </div>

    );
}
export default MainPage;