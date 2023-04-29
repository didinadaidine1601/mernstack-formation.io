import { Button, Col, Form, Input, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import {
    CloudSyncOutlined
} from "@ant-design/icons"


const WformMention = ({ getMentions, show, setshow }) => {

    const initialvalue = {
        "nom": ""
    }
    const [values, setvalues] = useState(initialvalue)
    const [datasource, setdatasource] = useState([])
    let [data, setData] = useState([])

    useEffect(() => {
    
      return () => {
        setdatasource(data)
       
      }
    }, [data,datasource])
    


    const { form } = Form.useForm()
    //dispposition de mes composant du formulaire
    const layout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 16
        }
    }


    //function appele lors de la soumission du formulaire
    const onFinish = () => {
        data.push(values)
        

    }



    //modifie le state de la mention edit
    const handlechange = (event) => {
        const { value, name } = event.target
        setvalues({ ...values, [name]: value })

    }

    //modifie le state de la mention edit
    const close = () => {
        setshow(!show)
    }

    const saveData = () => {
        const insertMention = async () => {
           datasource.map(async (v,i)=>{
            const stmt = await window.fetch(`/api/addMention`, {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(v)
            })

            if (stmt) {
                getMentions()
                setshow(!show)

            }
           })
        }

        //envoie les donne a la base
        insertMention()
    }





    return (
        <>
            <Row>
                <Col span={24}>
                    <Form form={form} {...layout} onFinish={onFinish} >



                        <Form.Item initialValue={""} label={"Nom"} name={"nom"} rules={[
                            {
                                required: true,
                                message: "veuillez renseigner le champ nom"
                            }
                        ]} >
                            <Input type='text' name='nom' id='mentionInput' onChange={handlechange} />
                        </Form.Item>





                        <Form.Item label={
                            <CloudSyncOutlined style={{ fontSize: "30px" }} />
                        }>
                            <Button type='primary' danger onClick={close} >Fermer</Button>&nbsp;&nbsp;
                            <Button type='primary' htmlType='submit'>Ajouter</Button>
                        </Form.Item>


                    </Form>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Table columns={
                        [
                            {
                                key: "nomtemp",
                                title: "Liste des mentions",
                                dataIndex: "nom",
                                sorter: (a, b) => a.nom.length - b.nom.length,
                                sortDirections: ['descend']
                            }
                        ]
                    } dataSource={
                        datasource.map((v, i) => {
                            return {
                                key: i,
                                nom: v.nom
                            }
                        })
                    } />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Button type='primary' shape='round' onClick={saveData} size='large' >Enregistrer</Button>
                </Col>
            </Row>
        </>
    )
}

export default WformMention