
import 'antd/dist/antd.css'

import {connect} from "react-redux"
import {compose} from "redux"
import {Layout} from "./Layout"
import {getIsLoadingData} from "../../BLL/selectors"


const mapStateToProps = (state) => {
    return ({
        isLoadingData: getIsLoadingData(state) //state.convertPage.isLoadingData,
    })
}

export const LayoutContainer = compose(
    connect(mapStateToProps)
)(Layout)









