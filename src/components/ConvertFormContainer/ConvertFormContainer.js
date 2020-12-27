
import {compose} from "redux"
import {setCash, setCurrency, setCurrency2, setReversedCurrencies} from "../../BLL/convertReducer"
import {connect} from "react-redux"
import {ConvertForm} from "./ConvertForm";
import {getCash, getCurrency, getCurrency2, getDailyJson} from "../../BLL/selectors";


const mapStateToProps = (state) => {
    return ({
        cash: getCash(state), //state.convertPage.cash
        currency: getCurrency(state), //state.convertPage.currency
        currency2: getCurrency2(state), //state.convertPage.currency2
        DailyJson: getDailyJson(state), //state.convertPage.DailyJson,
    })
}

export const ConvertFormContainer =  compose(
    connect(mapStateToProps, {setCash, setCurrency, setCurrency2, setReversedCurrencies})
)(ConvertForm)

