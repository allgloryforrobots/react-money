import React from 'react'
import {Space, Spin} from "antd"

//UI
export const FirstLoad = () => (
            <div>
                <Space style={{margin: "5px"}}>
                    <Spin size="large"/>
                </Space>
                <span>&nbsp;Сервер думает...</span>
            </div>

)


