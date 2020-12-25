import React from "react"
import 'antd/dist/antd.css'
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import DAL from "../../DAL/DAL";

    // Подключаем AL
const dal = new DAL()

export default class BLL extends React.PureComponent {

    // BLL = хранилище данных в локальном стейте
    state = {}


    // DAL = делаем запрос на сервер
    componentDidMount() {
        dal.getMoneyData()
            .then((response) => this.setState({moneyData: Object.values(response.data.Valute)}))
    }



    render() {
        console.log(this.state.moneyData)
        return (
            <>
                <LayoutWrapper/>
            </>
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
