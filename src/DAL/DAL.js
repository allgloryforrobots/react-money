import {Component} from "react"
const axios = require('axios')

const instance = axios.create({

    baseURL: 'https://www.cbr-xml-daily.ru/',

})


export default class DAL extends Component {

    async getDailyJson() {
            return await instance.get('daily_json.js')
    }
    async getLatestJson() {
            return await instance.get('latest.js')
    }
}
