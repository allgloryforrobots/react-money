import React from 'react'
import {Alert} from "antd"
import {compose} from "redux"
import {connect} from "react-redux"

//UI
const ServerOk = ({ LatestJson }) => (
    <Alert
        message={`Получены курсы валют на ${LatestJson.date}`}
        type="success"
        style={{marginBottom: "50px"}}
        showIcon />
)

//Container
const mapStateToProps = (state) => {
    return ({
        LatestJson: state.convertPage.LatestJson
    })
}

export const ServerOkContainer = compose(
    connect(mapStateToProps)
)(ServerOk)
