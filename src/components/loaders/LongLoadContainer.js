import React from 'react'
import {Alert} from "antd"
import {compose} from "redux"
import {connect} from "react-redux"

//UI
const LongLoad = ({ isLoadingLong, loadError}) => (

        (isLoadingLong && !loadError)
            ? <Alert message="Долго думает..."
                     type="warning"
                     style={{margin: "5px"}}
                     showIcon/>
            : null
)

//Container
const mapStateToProps = (state) => {
    return ({
        isLoadingLong: state.convertPage.isLoadingLong,
        loadError: state.convertPage.loadError,
    })
}

export const LongLoadContainer = compose(
    connect(mapStateToProps)
)(LongLoad)
