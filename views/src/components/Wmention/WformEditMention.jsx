import { Button, Form, Input, Modal } from 'antd'
import React from 'react'
import {
    CloudSyncOutlined
} from "@ant-design/icons"

/**
 * module d'edition de la mention
 * @param {*} param0 
 * @returns 
 */
const WformEditMention = ({ values, setvalues, show, setshow, getMentions }) => {


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
        const updateMention = async () => {
            const stmt = await window.fetch(`/api/updatemention/${String(values.key)}`, {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                method: "PATCH",
                body: JSON.stringify(values)
            })

            if (stmt) {
                getMentions()
                setshow(!show)

            }
        }

        //envoie les donne a la base
        updateMention()
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



    return (
        <>
            <Form form={form} {...layout} onFinish={onFinish} >



                <Form.Item label={"Nom"} initialValue={values.nom} name={"nom"} rules={[
                    {
                        required: true,
                        message: "veuillez renseigner le champ nom"
                    }
                ]} >
                    <Input type='text' name='nom' onChange={handlechange} />
                </Form.Item>





                <Form.Item label={
                    <CloudSyncOutlined style={{ fontSize: "30px" }} />
                }>
                    <Button type='primary' danger onClick={close} >Fermer</Button>&nbsp;&nbsp;
                    <Button type='primary' htmlType='submit'> Modifier</Button>
                </Form.Item>


            </Form>
        </>
    )
}

export default WformEditMention