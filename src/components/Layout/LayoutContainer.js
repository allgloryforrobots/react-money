import React from "react"
import 'antd/dist/antd.css'

import {connect} from "react-redux"
import {compose} from "redux"
import {Layout} from "./Layout"


const mapStateToProps = (state) => {
    return ({
        isLoadingData: state.convertPage.isLoadingData,
    })
}

export const LayoutContainer = compose(
    connect(mapStateToProps)
)(Layout)









