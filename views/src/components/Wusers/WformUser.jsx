import { Button, Form, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'
import {
    CloudSyncOutlined
} from "@ant-design/icons"

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const WformUser = ({ show, setshow,getValues }) => {
    const initialvalue = {
        "nom": "",
        "prenom": "",
        "matricule": 0,
        "datenaissance": "",
        "profession": "",
        "email": "",
        "password": ""
    }
    const [values, setvalue] = useState(initialvalue)

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

    // les options de la profession

    const items = ["Etudiant", "Administrateur", "Enseignant"].map((v, index) => {
        return {
            label: v,
            value: v.toLowerCase()
        }
    })

    //methode pour fermer le formulaire

    const close = () => {
        setshow(!show)
    }

    // lors de chaque changement de saisie

    const handlechange = event => {
        const { value, name } = event.target
        setvalue({ ...values, [name]: value })
    }
    // lors du changement de la profession
    const handleSelect = event => {
        setvalue({ ...values, ["profession"]: event })


    }

    //lors de la soumission du formulaire

    const onFinish = (val) => {
        if (val.passwordconfirm === values.password) {

            const inserUser = async () => {

                try {
                    const stmtinsert = await window.fetch('/api/adduser', {
                        headers: {
                            Accept: "application/json",
                            "Content-type": "application/json"
                        },
                        method: "POST",
                        body: JSON.stringify(values)
                    })

                    if (stmtinsert.status === 200) {
                        Modal.destroyAll()
                        setshow(!show)
                        getValues()
                    }else{
                        const e=await stmtinsert.json()
                        const errins=e.error
                        const keyValue=JSON.stringify(errins.keyValue)
                        if (errins.code===11000) {
                            Modal.warning({
                                title: "Attention",
                                content: <>
                                <span>Cette enregistrement</span>&nbsp; <h4 style={{color:"red"}}>{keyValue}</h4> <span>&nbsp;existe deja.</span>
                                </>
                            })
                        }
                    }

                } catch (error) {
                    Modal.warning({
                        title: "Attention",
                        content: "Une erreur est survenue lors de l'envoie des donnée"
                    })
                }

            }

            inserUser()

        } else {
            Modal.warning({
                title: "Attention",
                content: "Le mot de passe doitetre identique"
            })
        }

    }

    return (
        <>
            <Form form={form} {...layout} onFinish={onFinish} >

                <Form.Item label={"Nom"} name={"nom"} rules={[
                    {
                        required: true,
                        message: "veuillez renseigner le champ nom"
                    }
                ]} >
                    <Input type='text' name='nom' onChange={handlechange} />
                </Form.Item>

                <Form.Item label={"Prenom"} name={"prenom"} rules={[
                    {
                        required: true,
                        message: "veuillez renseigner le champ prenom"
                    }
                ]}>
                    <Input type='text' name='prenom' onChange={handlechange} />

                </Form.Item >

                <Form.Item label={"Matricule"} name={"matricule"} rules={[
                    {
                        required: true,
                        message: "veuillez renseigner le champ matricule"
                    }
                ]}>
                    <Input type='number' name='matricule' onChange={handlechange} />

                </Form.Item>

                <Form.Item label={"Profession"} name={"profession"} rules={[
                    {
                        required: true,
                        message: "veuillez renseigner le champ profession"
                    }
                ]}>
                    <Select options={items} onChange={handleSelect} />


                </Form.Item>

                <Form.Item label={"Date de naissance"} name={"datenaissance"} rules={[
                    {
                        required: true,
                        message: "veuillez renseigner le champ naissance"
                    }
                ]} >
                    <Input type='date' name='datenaissance' onChange={handlechange} />

                </Form.Item>
                <Form.Item label={"Email"} name="email" rules={[
                    {
                        required: true,
                        message: "veuillez renseigner le champ email"
                    }
                ]}>
                    <Input type='email' name='email' onChange={handlechange} />
                </Form.Item>

                <Form.Item label={"Password"} name="password" rules={[
                    {
                        required: true,
                        message: "veuillez renseigner le champ password"
                    }
                ]}>
                    <Input type='password' name='password' onChange={handlechange} />

                </Form.Item>
                <Form.Item label={"Confirme Password"} name={"passwordconfirm"} >
                    <Input type='password' name='passwordconfirm' />

                </Form.Item>

                <Form.Item label={
                    <CloudSyncOutlined style={{ fontSize: "30px" }} />
                }>
                    <Button type='primary' danger onClick={close} >Fermer</Button>&nbsp;&nbsp;
                    <Button type='primary' htmlType='submit'> Ajouter</Button>
                </Form.Item>


            </Form>
        </>
    )
}

export default WformUser