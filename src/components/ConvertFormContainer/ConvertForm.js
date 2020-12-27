import React from 'react'
import {Form, Input, Select} from 'antd'
import SyncOutlined from "@ant-design/icons/lib/icons/SyncOutlined"

const {Option} = Select

export const ConvertForm = ({ DailyJson, cash, currency, currency2,
                         setCash, setCurrency, setCurrency2,
                         setReversedCurrencies}) => {




    // Сортируем элементы массива MoneyData, чтобы часто исп. валюты оказались наверху
    const sortDailyJson = [...DailyJson]
    const orderElements = [
        {code: 'CNY'},
        {code: 'GBP'},
        {code: 'EUR'},
        {code: 'USD'},
    ]
    orderElements.forEach((item, index) => {
        orderElements[index].data = DailyJson.find(item => item.CharCode === orderElements[index].code)
        orderElements[index].dataIndex = DailyJson.findIndex(item => item.CharCode === orderElements[index].code)
    })
    orderElements.forEach((item, index) => {
        sortDailyJson.splice(orderElements[index].dataIndex, 1)

    })
    orderElements.forEach((item, index) => {
        sortDailyJson.unshift(orderElements[index].data)
    })

    // Валидация > ввод только чисел + сразу записываем значение  => запись в стейт
    const onNumberChange = (e) => {
        const newNumber = parseInt(e.target.value || 0, 10);
        if (Number.isNaN(newNumber)) {
            return
        }
        setCash(newNumber)
    }

    return (
        <Form
            name="customized_form_controls"
            layout="vertical"
        >

                    <Input
                        type="tel"
                        value={cash}
                        style={{
                            width: 120,
                            margin: "5px"
                        }}
                        onChange={(e) => onNumberChange(e)}
                    />

                    <Select
                        value={currency}
                        style={{
                            width: 270,
                            margin: "5px"
                        }}
                        // Здесь value от API ant Design = не путай с тем же в селекте :)
                        onChange={(value) => setCurrency(value)}
                    >
                        <Option key='RUB'
                                value='RUB'><strong>RUS&nbsp;</strong> Российский рубль</Option>
                        {
                            sortDailyJson.map((el, index) => {
                                return (
                                    <Option key={Math.random() + 'currency'}
                                            value={sortDailyJson[index].CharCode}>
                                        <strong>{sortDailyJson[index].CharCode}&nbsp;</strong> {sortDailyJson[index].Name}
                                    </Option>
                                )
                            })
                        }
                    </Select>

                    <SyncOutlined onClick={() => setReversedCurrencies(currency, currency2)}
                                  style={{color: "yellowgreen", margin: "5px", fontSize: "1rem"}}/>

                    <Select
                        value={currency2}
                        style={{
                            width: 270,
                            margin: "5px"
                        }}
                        onChange={(value) => setCurrency2(value)}
                    >
                        <Option key='RUB'
                                value='RUB'><strong>RUS&nbsp;</strong> Российский рубль</Option>
                        {
                            sortDailyJson.map((el, index) => {
                                return (
                                    <Option key={Math.random() + 'currency2'}
                                            value={sortDailyJson[index].CharCode}>
                                        <strong>{sortDailyJson[index].CharCode}&nbsp;</strong> {sortDailyJson[index].Name}
                                    </Option>
                                )
                            })
                        }
                    </Select>

        </Form>
    )
}


