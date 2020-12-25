import {Component} from "react";

const axios = require('axios')


export default class DAL extends Component {

    async getDailyJson() {
        try {
            return await axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
        } catch (error) {
            console.error('Ошибка на сервере', error)
            return error
        }
    }
    async getLatestJson() {
        try {
            return await axios.get('https://www.cbr-xml-daily.ru/latest.js')
        } catch (error) {
            console.error('Ошибка на сервере', error)
            return error
        }
    }



}

// ${process.env.REACT_APP_KEY}