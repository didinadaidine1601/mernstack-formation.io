import React from 'react'
import { Image, Layout, Menu,Button } from 'antd'
import {
    MenuOutlined,
    PhoneOutlined
} from "@ant-design/icons"
import { Link } from 'react-router-dom'
const { Header } = Layout


const Navbar = ({show, setshow}) => {

    const propsitems = [
        {
            key: "menuhumberger",
            label: null,
            icon: <MenuOutlined onClick={()=>{
                setshow(!show)

            }} style={{fontSize:"30px"}} />
        },
        {
            key: "logo",
            label: <Link to={"/"}>
                <div style={{display:"flex"}}>
                    <div> 
                        <Image src={process.env.PUBLIC_URL+'/images/logo.png'} width={50} preview={false} />
                    </div>&nbsp;&nbsp;
                    <div>Gestion de personnel</div>
                    
                </div>
            </Link>,
            icon: null
        },
        {
            key:"telephone",
            label:"00261349739202",
            icon: <PhoneOutlined />
        },
        {
            key:"sign in",
            label:<Button type={"primary"} >Deconnexion</Button>,
            icon:null
        }
    ]

    return (
        <Header>
            <Menu theme='dark' mode='horizontal' defaultSelectedKeys={'telephone'} key={"navbar"} items={propsitems} />

        </Header>
    )
}

export default Navbar