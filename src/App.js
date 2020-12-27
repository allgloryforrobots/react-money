import {connect, Provider} from "react-redux";
import store from "./BLL/redux-store";
import React, {Component} from 'react'
import {LayoutContainer} from "./components/Layout/LayoutContainer";
import {compose} from "redux";
import {InitAppThunkCreator} from "./BLL/convertReducer";


class AppDAL extends Component {

    componentDidMount() {
        // Загружаем данные с сервера
        this.props.InitAppThunkCreator()
    }

    render() {
        return (
            <div>
                <LayoutContainer/>
            </div>
        )
    }
}

// Запрос к BLL
export const AppContainer = compose(
    connect(null, {InitAppThunkCreator})
)(AppDAL)

// Точка доступа к BLL
export const App = () => {
    return (
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    )
}