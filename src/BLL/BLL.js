import React from "react"
import DAL from "../DAL/DAL"
import 'antd/dist/antd.css'
import {Alert, Space, Spin, Statistic} from 'antd'

import ConvertFormDuplicate from "../components/ConvertForm/ConvertFormDuplicate";

// Подключаем DAL
const dal = new DAL()

// Подключаем логику конверсии валют
const fx = require("money")


export default class BLL extends React.PureComponent {

    // BLL = хранилище данных в локальном стейте
    state = {
        cash: 0,
        currency: 'RUB',
        currency2: 'RUB',
        resultCash: 0,
        isLoadingData: false,
        isLoadingLong: false,
        loadError: null
    }

    // Метод конвертирующий валюту
    recalculateResultCash = (cash, currency, currency2) => {
        if (currency === currency2) {
            return cash
        } else {
            return fx(cash)
                .convert({ from: currency , to: currency2 })
        }
    }

    setCash = (cash) => {
        const { currency, currency2 } = this.state
        this.setState( (state) => {
            return {
                cash,
                resultCash: this.recalculateResultCash(cash, currency, currency2)
            }
        })
    }

    setCurrency = (currency) => {
        const { cash, currency2 } = this.state
        this.setState( (state) => {
            return {
                currency,
                resultCash: this.recalculateResultCash(cash, currency, currency2)
            }
        })
    }

    setCurrency2 = (currency2) => {
        const { cash, currency } = this.state
        this.setState( (state) => {
            return {
                currency2,
                resultCash: this.recalculateResultCash(cash, currency, currency2)
            }
        })
    }

    setReversedCurrencies = () => {
        const { cash, currency, currency2 } = this.state

        const reversedCurrency = currency2
        const reversedCurrency2 = currency

        this.setState( (state) => {
            return {
                currency: reversedCurrency,
                currency2: reversedCurrency2,
                resultCash: this.recalculateResultCash(cash, reversedCurrency, reversedCurrency2)
            }
        })
    }

    // DAL => BLL + Money.js, Loading...
    loadAllData = () => {
        // Таймер долгой загрузки: запуск
        let timerLongLoad = setTimeout(
            () => this.setState(
                (state) => {
                    return {isLoadingLong: true} }), 4000)

        Promise.all([ dal.getDailyJson(), dal.getLatestJson() ])
            .then(values => {
                // Таймер долгой загрузки: стоп
                clearTimeout(timerLongLoad)
                // Записываем в стейт все данные после асинхронного ответа сервера
                this.setState((state) => {
                    return {
                        DailyJson: Object.values(values[0].data.Valute),
                        LatestJson: values[1].data,
                        isLoadingData: true,
                        isLoadingLong: false
                    }
                })
                //Создаем настройки для работы библиотеки money.js
                fx.rates = values[1].data.rates
                fx.base = values[1].data.base
            })

            .catch(error => {
                this.setState((state) => {
                    return {
                        loadError: error.toString()
                    }
                })
            })
    }

    // DAL = запрос на сервер
    componentDidMount() {
        this.loadAllData()
    }

    // UI
    render() {
        console.log('Вызван метод render', this.state)

        const {DailyJson, cash, currency, currency2} = this.state

        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                padding: "20px",
                height: "100%"
            }}>

                {this.state.isLoadingData
                    ? <div>
                        <Alert
                            message={`Получены курсы валют на ${this.state.LatestJson.date}`}
                            type="success"
                            style={{marginBottom: "50px"}}
                            showIcon />
                        <ConvertFormDuplicate
                            DailyJson={DailyJson}
                            setCash={this.setCash}
                            setCurrency={this.setCurrency}
                            setCurrency2={this.setCurrency2}
                            setReversedCurrencies={this.setReversedCurrencies}
                            cash={cash}
                            currency={currency}
                            currency2={currency2}
                        />
                        <Statistic title="Результат"
                                   style={{textAlign: "center"}}
                                   value={`${this.state.resultCash} ${this.state.currency2}`} />
                    </div>

                    : <div>
                        <Space style={{margin: "5px"}}>
                            <Spin size="large"/>
                        </Space>
                        <span>Сервер думает...</span>
                     </div>
                }

                {
                    this.state.isLoadingLong
                        ? <Alert message="Долго думает..."
                                 type="warning"
                                 style={{margin: "5px"}}
                                 showIcon />

                        : null
                }

                {
                    this.state.loadError
                        ? <Alert message={this.state.loadError} type="error" showIcon/>

                        : null
                }

            </div>
        )
    }
}



