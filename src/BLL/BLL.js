import React from "react"
import DAL from "../DAL/DAL"
import 'antd/dist/antd.css'
import {Alert, Space, Spin, Statistic} from 'antd'
import ConvertForm from "../components/ConvertForm/ConvertForm"

// Подключаем DAL
const dal = new DAL()

// Подключаем логику конверсии валют
const fx = require("money")


export default class BLL extends React.PureComponent {

    // BLL = хранилище данных в локальном стейте
    state = {
        calcForm: {
            number: 0,
            currency: 'RUB',
            currency2: 'RUB',
        },
        resultCash: 0,
        isLoadingData1: false,
        isLoadingData2: false,
    }

    // Метод конвертирующий валюту
    recalculateResultCash = (props) => {
        const {number, currency, currency2} = props
        if (currency === currency2) {
            return number
        } else {
            return fx(number)
                .convert({ from: currency , to: currency2 })
        }

    }

    // Передаем функцию через пропсы => потомок передает данные в стейт
    setDataToState = (values) => {
        const resultCash = this.recalculateResultCash(values.calcForm)
        this.setState((state) => {
            //TODO: мутирую стейт? исправить?
            return {
                ...values,
                resultCash
            }
        })
    }


    // DAL => BLL + Money.js, Loading...
    loadAllData = () => {


        Promise.all([ dal.getDailyJson(), dal.getLatestJson() ])
            .then(values => {
                //first return value
                this.templateName = values[0]
                this.setState((state) => {
                    return {
                        moneyData: Object.values(values[0].data.Valute),
                        isLoadingData1: true
                    }
                })

                //second return value
                this.setState((state) => {
                    return {
                        moneyJsData: values[1].data,
                        isLoadingData2: true
                    }
                })
                //Создаем настройки для работы библиотеки money.js
                fx.rates = values[1].data.rates
                fx.base = values[1].data.base

            })

            .catch(error => {
                //this.errormsg = error.response.data.message
                //this.isLoadingAllData = false
            })
    }

    // DAL = запрос на сервер
    componentDidMount() {
        this.loadAllData()
    }

    // UI
    render() {
        console.log('Вызван метод render', this.state)

        return (
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                padding: "20px",
                height: "300px"

            }}>

                {/*<button*/}
                {/*    onClick={() =>this.recalculateValute(1, 'USD', "RUB")}>*/}
                {/*    ТЕСТ*/}
                {/*</button>*/}

                {this.state.isLoadingData1 && this.state.isLoadingData2
                    ? <div>
                        <Alert
                            message={`Получены курсы валют на ${this.state.moneyJsData.date}`}
                            type="success"
                            style={{marginBottom: "50px"}}
                            showIcon />
                        <ConvertForm
                            calcForm={this.state.calcForm}
                            moneyData={this.state.moneyData}
                            stateEasy={this.setDataToState}
                        />
                        <Statistic title="Результат"
                                   style={{textAlign: "center"}}
                                   value={`${this.state.resultCash} ${this.state.calcForm.currency2}`} />
                    </div>

                    : <div>
                        <Space style={{marginRight: "20px"}}>
                            <Spin size="large"/>
                        </Space>
                        <span>Соединение с сервером...</span>
                     </div>
                }

            </div>

        )
    }
}

// {this.state.moneyData
//     ? this.moneyItems(dataArr)
//     : <Button type="primary" loading>
//         Loading
//     </Button>}

//
// moneyItems = (dataArr) => dataArr.map(el =>
//     <li key={el.ID}>
//         <strong>
//             {el.CharCode}
//         </strong>&nbsp;
//         <span>
//                     {el.Name}
//                 </span>
//     </li>
// )

// Преобразуем данные из стейта в разметку
// const dataArr = this.state.moneyData


