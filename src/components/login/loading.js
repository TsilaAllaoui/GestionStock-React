import React from "react";
import { Spin, Space } from "antd";

class Loading extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        <Space size="middle">
            <Spin size="large"/>
        </Space>
    }
}