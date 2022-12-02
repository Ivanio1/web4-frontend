import React from 'react';
import classes from "./PointParamsPanel.module.css";
import {Textinput} from "@yandex/ui/Textinput/desktop/bundle";
import {Button} from "@yandex/ui/Button/desktop/bundle";
import {pointAPI} from "../../api/PointService";
import {IPoint} from "../../models/IPoint";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

const PointParamsPanel = (props: any) => {


    const dispatch = useAppDispatch();

    const [submitPoint, {}] = pointAPI.useSubmitNewPointMutation();
    //const deleteAll = pointAPI.useFetchDeletePointsQuery("");


    const handleSubmit = async () => {
        if (errorStateX === "error" || errorStateY === "error") return;
        if (stateX === "" || stateX === null || stateY === "" || stateY === null) return;
        let date = new Date();
        let utcDate = date.toUTCString()
        await submitPoint({
            x: Number(stateX),
            y: Number(stateY),
            r: Number(stateR),
            currtime: utcDate,
        } as IPoint);
    }


     // const handleDelete = async () => {
     //     await deleteAll
     // }

    const changeX = (x: string) => {
        dispatch({type: "X_CHANGE", payload: x})
    }

    const changeY = (y: string) => {
        dispatch({type: "Y_CHANGE", payload: y})
    }

    const changeR = (r: string) => {

        dispatch({type: "R_CHANGE", payload: r})

    }

    const stateX = useAppSelector(state => state.point.x);
    const stateY = useAppSelector(state => state.point.y);
    const stateR = useAppSelector(state => state.point.r);

    const errorStateX = useAppSelector(state => state.point.errorStateX);
    const errorStateY = useAppSelector(state => state.point.errorStateY);
    const errorStateR = useAppSelector(state => state.point.errorStateR);


    return (
        <div className={classes.pointParamsPanel}>

            <div className={classes.text_container}>
                <label>X:
                    <Textinput id="x-selector"
                               size="m"
                               view="default"
                               pin="round-round"
                               placeholder="Input X..."
                               maxLength={3}
                               hasClear={true}
                               value={stateX}
                               state={errorStateX as "error"}
                               hint={errorStateX === "error" ? "-5 <= x <= 5" : ""}
                               onChange={(event) => {
                                   changeX(event.target.value);
                               }}
                    />
                </label></div>
            <div className={classes.text_container}>
                <label>Y:
                    <Textinput id="y-selector"
                               size="m"
                               view="default"
                               pin="round-round"
                               placeholder="Input Y..."
                               maxLength={3}
                               hasClear={true}
                               value={stateY}
                               state={errorStateY as "error"}
                               hint={errorStateY === "error" ? "-5 <= y <= 3" : ""}
                               onChange={(event) => {
                                   changeY(event.target.value);
                               }}
                    />
                </label></div>
            <div className={classes.text_container}>
                <label>R:
                    <Textinput id="r-selector"
                               size="m"
                               view="default"
                               pin="round-round"
                               placeholder="Input R..."
                               maxLength={3}
                               hasClear={true}
                               value={stateR}
                               state={errorStateR as "error"}
                               hint={errorStateR === "error" ? "0 < x <= 5" : ""}
                               onChange={(event) => {
                                   changeR(event.target.value);
                               }}
                    />
                </label>
            </div>
            <br/><br/>
            <div style={{display: "flex", flexDirection: "row"}}>
                <div className={classes.button_container}>
                    <Button size="l"
                            width="max"
                            view="default"
                            type="submit"
                            onClick={(e) => handleSubmit()}
                            pin="circle-circle">
                        Submit
                    </Button>

                </div>
                {/*<div className={classes.button_container}>*/}
                {/*    <Button size="l"*/}
                {/*            width="max"*/}
                {/*            view="default"*/}
                {/*            type="submit"*/}
                {/*            onClick={(e) => handleDelete()}*/}
                {/*            pin="circle-circle">*/}
                {/*        Delete*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </div>

        </div>
    );
};

export default PointParamsPanel;