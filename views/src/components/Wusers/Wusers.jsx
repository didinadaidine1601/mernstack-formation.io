import { Button, Card, Col, Modal, Row, Space, Table } from 'antd'
import React, { useState, useEffect } from 'react'
import HeadeContent from '../../partials/HeadeContent'
import WformUser from './WformUser'
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons"
import WformUserEdit from './WformUserEdit'
const { Meta } = Card

/**
 * 
 * @returns 
 */
const Wusers = () => {

  const [showForm, setshowForm] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [values, setvalues] = useState([]) 
  const [userEdit, setuserEdit] = useState([]) 

  //recupere toute les utilisateur
  const getValues = async () => {
    const stmt = await window.fetch('/api/getAllusers')
    const data = await stmt.json()
    setvalues(data)
  }
  //use Effect
  useEffect(() => {
    return () => {
      getValues()
    }
  }, [])




  //entete pour la table
  const tableHeader = [
    {
      title: "Nom",
      dataIndex: "nom",
      sortDirections: ['descend'],
      sorter: (a, b) => a.nom.length - b.nom.length,
    },
    {
      title: "Prenom",
      dataIndex: "prenom",
      sortDirections: ['descend'],
      sorter: (a, b) => a.prenom.length - b.prenom.length,

    },
    {
      title: "Matricule",
      dataIndex: "matricule",
      sortDirections: ['descend'],
      sorter: (a, b) => a.matricule.length - b.matricule.length,

    },
    {
      title: "Profession",
      dataIndex: "profession",
      sortDirections: ['descend'],
      sorter: (a, b) => a.profession.length - b.profession.length,

    },
    {
      title: "Email",
      dataIndex: "email",
      sortDirections: ['descend'],
      sorter: (a, b) => a.email.length - b.email.length,

    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      sortDirections: ['descend'],
      render: (_, record) => (
        <Space size={'middle'}>
          <Button type='primary' shape={'round'} key={record._id} onClick={() => { setIsEditable(!isEditable); setuserEdit(record) }} >
            <EditOutlined style={{ fontSize: "20px" }} />
          </Button>

          <Button type='primary' shape={'round'} onClick={() => { deleteUsers(record) }} danger key={`sup${record._id}`}>
            <DeleteOutlined style={{ fontSize: "20px" }} />
          </Button>
        </Space>
      )

    }
  ]

  // datasource provenant de la base
  const dataSource = values.map((val, ind) => {

    return {
      key: `${val._id}`,
      nom: val.nom,
      prenom: val.prenom,
      matricule: val.matricule,
      profession: val.profession,
      email: val.email,
      password: val.password,
      datenaissance: val.datenaissance,
    }

  })

  //function qui affiche le modale de confirmation de la suppression
  const deleteUsers = (user) => {
    Modal.confirm({
      title: "Suppression",
      icon: <DeleteOutlined style={{ fontSize: "30px", color: 'red' }} />,
      centered: true,
      content: <Card style={{ background: 'transparent', border: '0px solid transparent' }} cover={<span>Etes vous sur de vouloir</span>}>
        <Meta description={`supprimer l'utilisateur ${user.nom}  ${user.prenom} ?`} />
      </Card>,
      okText: "Supprimer",
      cancelText: "Annuler",
      onOk: () => {

        const deluser = async () => {
          const id = await user.key
          const query = await window.fetch(`/api/deleteusers/${id}`, {
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json'
            },
            method: "DELETE"
          })

          if (query.status === 200) {
            Modal.destroyAll()
            getValues()

          }


        }

        deluser()
      },
      onCancel: () => {
        Modal.destroyAll()
      }

    })
  }



  return (

    <>

      {
        //on affiche le formulaire d'ajout
        showForm && !isEditable ? <Card style={{ padding: "10px" }} cover={
          <div>
            <PlusCircleOutlined style={{ fontSize: "20px" }} />&nbsp;&nbsp;
            <span style={{ fontFamily: "monospace", fontSize: "16px", fontWeight: "bold" }}>Ajout d'utilisateurs</span>
          </div>

        }>
          <Meta description={<WformUser show={showForm} setshow={setshowForm} getValues={getValues} />} />
        </Card>
          //sinon on affiche le formulaire d'edition
          : !showForm && isEditable ?

            <Card style={{ padding: "10px" }} cover={
              <div>
                <EditOutlined style={{ fontSize: "20px" }} />&nbsp;&nbsp;
                <span style={{ fontFamily: "monospace", fontSize: "16px", fontWeight: "bold" }}>Edition d'utilisateur</span>
              </div>

            }>
              <Meta description={<WformUserEdit show={isEditable} setshow={setIsEditable} getValues={getValues} userEdit={userEdit} />} />
            </Card>
            :

            //on affiche le tablau des utilisateur
            <>
              <Row>
                <Col span={24}>
                  <HeadeContent show={showForm} setshow={setshowForm} titre={"Gestion d'utilisateur"} />

                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Table columns={tableHeader} dataSource={dataSource}  />
                </Col>
              </Row>
            </>
      }
    </>
  )
}

export default Wusers