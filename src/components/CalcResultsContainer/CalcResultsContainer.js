import React from 'react'
import {Statistic} from "antd"
import {compose} from "redux"
import {connect} from "react-redux"
import {getCurrency2, getUsers} from "../../BLL/selectors";


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
        resultCash: getUsers(state), //state.convertPage.resultCash
        currency2: getCurrency2(state)//state.convertPage.currency2
    })
}

export const CalcResultsContainer = compose(
    connect(mapStateToProps)
)(CalcResults)



