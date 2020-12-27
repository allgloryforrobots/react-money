import {Component} from "react";

const axios = require('axios')


export default class DAL extends Component {
    async getDailyJson() {
            return await axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
    }
    async getLatestJson() {
            return await axios.get('https://www.cbr-xml-daily.ru/latest.js')
    }
}
