import React from 'react'
import {compose} from "redux"
import {setCash, setCurrency, setCurrency2, setReversedCurrencies} from "../../BLL/convertReducer"
import {connect} from "react-redux"
import {ConvertForm} from "./ConvertForm";


const mapStateToProps = (state) => {
    return ({
        cash: state.convertPage.cash,
        currency: state.convertPage.currency,
        currency2: state.convertPage.currency2,
        DailyJson: state.convertPage.DailyJson,
    })
}

export const ConvertFormContainer =  compose(
    connect(mapStateToProps, {setCash, setCurrency, setCurrency2, setReversedCurrencies})
)(ConvertForm)

