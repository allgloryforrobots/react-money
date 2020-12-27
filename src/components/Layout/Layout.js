import {ServerOkContainer} from "../ServerOkContainer/ServerOkContainer";
import {ConvertFormContainer} from "../ConvertFormContainer/ConvertFormContainer";
import {CalcResultsContainer} from "../CalcResultsContainer/CalcResultsContainer";
import {FirstLoad} from "../loaders/FirstLoadContainer";
import {LoadErrorContainer} from "../loaders/LoadError";
import React from "react";


export const Layout = ({isLoadingData}) => {

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            padding: "20px",
            height: "100%"
        }}>
            {
                isLoadingData
                    ? <div>
                        <ServerOkContainer/>
                        <ConvertFormContainer/>
                        <CalcResultsContainer/>
                    </div>
                    : <FirstLoad/>
            }
            <LoadErrorContainer/>
        </div>
    )
}