import { Breadcrumb, Button, Form, Input } from 'antd'
import React from 'react'
import {
    RightOutlined,
    SearchOutlined
} from "@ant-design/icons"

/**
 * 
 * @param {*} param0 
 * @returns 
 */

const HeadeContent = ({titre,show,setshow}) => {

//style du contenu de l'entete de la page
const styleContent={
    fontFamily:"monospace",
    fontSize:"16px",
    fontWeight:"bold"
}

const layout={
    wrapperCol:{
        span:20
    },
     labelCol:{
        span:3
     }
}

// affiche le formulaire
const Adduser=()=>{
    setshow(!show)
}
    


    return (
        <Breadcrumb separator={<>&nbsp;</>} style={{padding:"10px"}} >
            <Breadcrumb.Item>
                <RightOutlined style={{fontSize:"20px"}}/>&nbsp;
                <span style={styleContent}>{titre}</span>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
                <Button type='primary' onClick={Adduser} style={{background:"#4ECDC4"}} shape='round'>Ajouter</Button>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
                <Form {...layout} >
                    <Form.Item label={
                        <Button type='primary' style={{background:"#4ECDC4"}} shape="round">
                            <SearchOutlined/>
                        </Button>
                    }> 
                        <Input placeholder='Recherche' inputMode='search' 
                        style={{borderTopRightRadius:"15px",
                        borderBottomRightRadius:"15px",
                        textAlign:"center"
                        }} />
                    </Form.Item>
                </Form>
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default HeadeContent