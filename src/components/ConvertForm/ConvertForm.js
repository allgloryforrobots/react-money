import React, {useState} from 'react'
import {Form, Input, Select} from 'antd'
import SyncOutlined from "@ant-design/icons/lib/icons/SyncOutlined";

const {Option} = Select

const PriceInput = ({value = {}, onChange, DailyJson}) => {

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

    const [number, setNumber] = useState(0)
    const [currency, setCurrency] = useState('RUB')
    const [currency2, setCurrency2] = useState('RUB')


    const triggerChange = (changedValue) => {
        if (onChange) {
            onChange({
                number,
                currency,
                currency2,
                ...value,
                ...changedValue,
            })
        }
    }

    const onNumberChange = (e) => {
        const newNumber = parseInt(e.target.value || 0, 10)

        if (Number.isNaN(number)) {
            return;
        }

        if (!('number' in value)) {
            setNumber(newNumber)
        }

        triggerChange({
            number: newNumber,
        })
    }

    const onCurrencyChange = (newCurrency) => {
        if (!('currency' in value)) {
            setCurrency(newCurrency)
        }

        triggerChange({
            currency: newCurrency,
        })
    }

    const onCurrencyChange2 = (newCurrency2) => {
        if (!('currency2' in value)) {
            setCurrency2(newCurrency2)
        }

        triggerChange({
            currency2: newCurrency2,
        })

    }


    return (
        <>
            <Input
                type="tel"
                value={value.number || number}
                onChange={onNumberChange}
                style={{
                    width: 120,
                    margin: "5px"
                }}
            />

            <Select
                value={value.currency || currency}
                style={{
                    width: 270,
                    margin: "5px"
                }}
                onChange={onCurrencyChange}
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

            <SyncOutlined style={{color: "yellowgreen", margin: "5px", fontSize: "1rem"}}/>

            <Select
                value={value.currency2 || currency2}
                style={{
                    width: 270,
                    margin: "5px"
                }}
                onChange={onCurrencyChange2}
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
        </>
    )
}

const ConvertForm = (props) => {

    const onValuesChange = (changedValues) => {
        console.log('Получены данные из формы: onValuesChange', changedValues)
        props.setFormResults(changedValues)
    }

    const checkPrice = (rule, value) => {
        if (value.number > 0) {
            return Promise.resolve()
        }

        return Promise.reject('Число должно быть больше нуля!')
    }

    return (
        <Form
            name="customized_form_controls"
            layout="vertical"
            onValuesChange={onValuesChange}
            initialValues={{
                calcForm: {
                    ...props.calcForm
                }
            }}

        >
            <Form.Item
                name="calcForm"
                rules={[
                    {
                        validator: checkPrice,
                    },
                ]}
            >
                <PriceInput DailyJson={props.DailyJson}/>
            </Form.Item>

        </Form>
    )
}

export default ConvertForm