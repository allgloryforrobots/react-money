import DAL from "../DAL/DAL"

// Ducks: Redux Reducer Bundles

// Actions
const SET_CASH = 'convertReducer/SET_CASH'
const SET_CURRENCY = 'convertReducer/SET_CURRENCY'
const SET_CURRENCY_2 = 'convertReducer/SET_CURRENCY_2'
const SET_REVERSED_CURRENCIES = 'convertReducer/SET_REVERSED_CURRENCIES'
const SET_LOAD_END = 'convertReducer/SET_LOAD_END'
const SET_LOAD_ERROR = 'convertReducer/SET_LOAD_ERROR'
const SET_DAILY_JSON = 'convertReducer/SET_DAILY_JSON'
const SET_LATEST_JSON = 'convertReducer/SET_LATEST_JSON'

// Метод конвертирующий валюту
const fx = require("money")
const recalculateResultCash = (cash, currency, currency2) => {
    if (currency === currency2) {
        return cash
    } else {
        return fx(cash)
            .convert({ from: currency , to: currency2 })
    }
}

//Reducer
let initialState = {
    cash: 0,
    currency: 'RUB',
    currency2: 'RUB',
    resultCash: 0,
    isLoadingData: false,
    loadError: null,
    LatestJson: {
        date: null
    },
    DailyJson: [

    ]
}

const convertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CASH:
            return {
                ...state,
                cash: action.newCash,
                resultCash: fx(action.newCash).convert({ from: state.currency, to: state.currency2 })
            }
        case SET_CURRENCY:

            return {
                ...state,
                currency: action.newCurrency,
                resultCash: fx(state.cash).convert({ from: action.newCurrency, to: state.currency2 })
            }
        case SET_CURRENCY_2:
            return {
                ...state,
                currency2: action.newCurrency2,
                resultCash: fx(state.cash).convert({ from: state.currency, to: action.newCurrency2 })
            }
        case SET_REVERSED_CURRENCIES:
            return {
                ...state,
                currency: action.currency2,
                currency2: action.currency,
                resultCash: fx(state.cash).convert({ from: action.currency2, to: action.currency })
            }
        case SET_LOAD_END:
            return {
                ...state,
                isLoadingData: true,
            }
        case SET_DAILY_JSON:
            return {
                ...state,
                DailyJson: action.DailyJson,
            }
        case SET_LATEST_JSON:
            return {
                ...state,
                LatestJson: action.LatestJson,
            }
        case SET_LOAD_ERROR:
            return {
                loadError: action.error.toString()
            }
        default:
            return state
    }

}

//Action Creators
export const setCash = (newCash) => ({type: SET_CASH, newCash})
export const setCurrency = (newCurrency) => ({type: SET_CURRENCY, newCurrency})
export const setCurrency2 = (newCurrency2) => ({type: SET_CURRENCY_2, newCurrency2})
export const setReversedCurrencies = (currency, currency2) => ({type: SET_REVERSED_CURRENCIES, currency, currency2} )
export const setDailyJson = (DailyJson) => ({type: SET_DAILY_JSON, DailyJson})
export const setLatestJson = (LatestJson) => ({type: SET_LATEST_JSON, LatestJson})
export const setLoadEng = () => ({type: SET_LOAD_END})
export const setLoadError = (error) => ({type: SET_LOAD_ERROR, error})

//Доступ к DAL => axios
const dal = new DAL()

//ThunkCreators
export const InitAppThunkCreator = () => (dispatch) => {

    Promise.all([dal.getDailyJson(), dal.getLatestJson()])
        .then( (response) => {
            // 1 вызов
            const DailyJson = Object.values(response[0].data.Valute)
            dispatch(setDailyJson(DailyJson))
            // 2 вызов
            const LatestJson = response[1].data
            dispatch(setLatestJson(LatestJson))
            dispatch(setLoadEng())
            fx.base = LatestJson.base
            fx.rates = LatestJson.rates
        })
        .catch((error) => {
            setLoadError(error)
        })
}

// Example
// export const LatestJsonThunkCreator = () => (dispatch) => {
//     dal.getLatestJson()
//         .then(response => {
//             const LatestJson = response.data
//             dispatch(setLatestJson(LatestJson))
//         })
// }



export default convertReducer


