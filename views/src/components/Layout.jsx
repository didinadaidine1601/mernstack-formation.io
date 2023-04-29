import React, { useState } from 'react'
import { Layout } from 'antd'
import Navbar from '../partials/Navbar'
import Sidebar from '../partials/Sidebar'
const { Content } = Layout

const LI_Layout = ({ children }) => {

    const [show, setshow] = useState(false)

    return (
        <Layout>
            <Navbar show={show} setshow={setshow} />
            <Layout>
                <Sidebar show={show} />
                <Layout>
                    <Content children={children}></Content>
                </Layout>

            </Layout>

        </Layout>
    )
}

export default LI_Layout