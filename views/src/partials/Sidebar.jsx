import React from 'react'
import { Card, Image, Layout, Menu } from 'antd'
import {
    DashboardOutlined, DesktopOutlined, QuestionCircleOutlined, CalendarOutlined

} from "@ant-design/icons"
import { Link } from 'react-router-dom'

const { Sider } = Layout
const { Meta } = Card




const Sidebar = ({show}) => {

    //style de l'image de profile
    const styleimg = {
        objectFit: "cover",
        position: "relative",
        left: "50px",
        border: "0px solid white",
        borderRadius: "50%",
        verticalAlign: "middle",
        overflowClipMargin: "content-box",
        overflow: "clip"
    }

    //les item du menu sidebare
    const icon = [DashboardOutlined, DesktopOutlined, CalendarOutlined, QuestionCircleOutlined]
    const zaza=["Utilisateur","Mention","Option","Matiere"]

    //liste d'itemes
    const items = icon.map((value, index) => {
        const key=String(value.render.name)

        return {
            key:`side${key}`,
            label: key==="DashboardOutlined" ? <Link to={"/"}>{"Dashbord"}</Link> :
            key==="DesktopOutlined" ? "Espace de travail" :
            key==="CalendarOutlined" ? <Link to={"/emploi_temp"}>{"Gestion de temps"}</Link>:
            <Link to={"/apropos"}>{"A propos"}</Link> ,
            
            icon: React.createElement(value),
            children:key !=="DesktopOutlined" ? null : 
            zaza.map((v,ind)=>{

                return {
                    key:v,
                    label:v==="Utilisateur" ? <Link to={"/user"}>{v}</Link> :
                    v==="Mention" ? <Link to={"/mention"}>{v}</Link> :
                    v==="Option" ? <Link to={"/option"}>{v}</Link> :<Link to={"/matiere"}>{v}</Link> 
                }
            })
        }
    })


    return (
        <Sider width={200} 
        style={{ height: "600px" }}
         collapsed={show} collapsedWidth={0} >

            <Card style={{ background: "transparent", border: "0px solid transparent" }} cover={
                <Image preview={false} width={100} height={100} style={styleimg} src={process.env.PUBLIC_URL + '/images/didina.png'} />
            }>
                <Meta title={<h3 style={{ color: "white" }}>daidine soumaila</h3>} />

            </Card>

            <Menu key={"side"} mode={"inline"} theme='dark' items={items} 
            defaultSelectedKeys={["sideDashboardOutlined"]}/>

        </Sider>
    )
}

export default Sidebar