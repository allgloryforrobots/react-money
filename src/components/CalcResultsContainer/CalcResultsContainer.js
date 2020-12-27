import React from 'react'
import {Statistic} from "antd"
import {compose} from "redux"
import {connect} from "react-redux"


//UI
function CalcResults({resultCash, currency2}) {
    return (
        <Statistic title="Результат"
                   style={{textAlign: "center"}}
                   value={`${resultCash} ${currency2}`}/>
    )
}

//Container = данные из BLL
const mapStateToProps = (state) => {
    return ({
        resultCash: state.convertPage.resultCash,
        currency2: state.convertPage.currency2
    })
}

export const CalcResultsContainer = compose(
    connect(mapStateToProps)
)(CalcResults)



