import React, {useState} from 'react'
import {Form, Input, Select} from 'antd'

const {Option} = Select

const PriceInput = ({value = {}, onChange, moneyData}) => {
    const [number, setNumber] = useState(0)
    const [currency, setCurrency] = useState('RUB')
    const [currency2, setCurrency2] = useState('RUB')

    // arr.unshift(...items) – добавляет элементы в начало.
    // let user = users.find(item => item.id == 1);
    // arr.splice(1, 1); // начиная с позиции 1, удалить 1 элемент

    // Сортируем элементы массива MoneyData, чтобы часто исп. валюты оказались наверху
    const jpyData = moneyData.find(item => item.CharCode === 'JPY')
    const gbpData = moneyData.find(item => item.CharCode === 'GBP')
    const euroData = moneyData.find(item => item.CharCode === 'EUR')
    const usdData = moneyData.find(item => item.CharCode === 'USD')

    const jpyDataIndex = moneyData.findIndex(item => item.CharCode === 'JPY')
    const gbpDataIndex = moneyData.findIndex(item => item.CharCode === 'GBP')
    const euroDataIndex = moneyData.findIndex(item => item.CharCode === 'EUR')
    const usdDataIndex = moneyData.findIndex(item => item.CharCode === 'USD')


        const sortMoneyData = [...moneyData]
        sortMoneyData.splice(jpyDataIndex, 1)
        sortMoneyData.unshift(jpyData)
        sortMoneyData.splice(euroDataIndex, 1)
        sortMoneyData.unshift(euroData)
        sortMoneyData.splice(usdDataIndex, 1)
        sortMoneyData.unshift(usdData)
        sortMoneyData.splice(gbpDataIndex, 1)
        sortMoneyData.unshift(gbpData)





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
        <div style={{marginBottom: "10px"}}>
      <Input
          type="tel"
          value={value.number || number}
          onChange={onNumberChange}
          style={{
              width: 120,
          }}
      />
      <Select
          value={value.currency || currency}
          style={{
              width: 250,
              margin: '0 8px',
          }}
          onChange={onCurrencyChange}
      >
          <Option key='RUB'
                  value='RUB'><strong>RUS&nbsp;</strong> Российский рубль</Option>
          {
              sortMoneyData.map((el, index) => {
                  return (
                      <Option key={Math.random() + 'currency'}
                              value={sortMoneyData[index].CharCode}>
                          <strong>{sortMoneyData[index].CharCode}&nbsp;</strong> {sortMoneyData[index].Name}
                      </Option>
                  )
              })
          }
      </Select>

            <span>=</span>

      <Select

          value={value.currency2 || currency2}
          style={{
              width: 250,
              margin: '0 8px',
          }}
          onChange={onCurrencyChange2}
      >
          <Option key='RUB'
                  value='RUB'><strong>RUS&nbsp;</strong> Российский рубль</Option>
          {
              sortMoneyData.map((el, index) => {
                  return (
                      <Option key={Math.random() + 'currency2'}
                              value={sortMoneyData[index].CharCode}>
                          <strong>{sortMoneyData[index].CharCode}&nbsp;</strong> {sortMoneyData[index].Name}
                      </Option>
                  )
              })
          }
      </Select>

    </div>
    )
}

const ConvertForm = (props) => {

    const onValuesChange = (changedValues) => {
        console.log('Получены данные из формы: onValuesChange', changedValues)
        props.stateEasy(changedValues)
    }

    const checkPrice = (rule, value) => {
        if (value.number > 0) {
            return Promise.resolve()
        }

        return Promise.reject('Число должно быть больше нуля!')
    };

    return (
        <Form
            name="customized_form_controls"
            layout="inline"
            onValuesChange={onValuesChange}
            initialValues={{
                calcForm: {
                    ...props.calcForm
                }
            }}

        >
            <Form.Item
                name="calcForm"
                label="У меня есть"
                rules={[
                    {
                        validator: checkPrice,
                    },
                ]}
            >
                <PriceInput moneyData={props.moneyData}/>
            </Form.Item>

        </Form>
    )
}

export default ConvertForm