import React from 'react'
import {Alert} from "antd"
import {compose} from "redux"
import {connect} from "react-redux"

//UI
const LoadError = ({ loadError}) => (

    loadError
        ? <Alert message={loadError} type="error" showIcon/>
        : null
)


//Container
const mapStateToProps = (state) => {
    return ({
        loadError: state.convertPage.loadError,
    })
}

export const LoadErrorContainer = compose(
    connect(mapStateToProps)
)(LoadError)
