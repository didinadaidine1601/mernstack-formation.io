import { Button, Card, Col, Modal, Row, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import HeadeContent from '../../partials/HeadeContent'
import {
  EditOutlined, DeleteOutlined,PlusCircleOutlined
} from '@ant-design/icons'
import WformEditMention from './WformEditMention'
import WformMention from './WformMention'
const {Meta}=Card

/**
 * module mention
 * @returns 
 */
const Wmention = () => {
  const [showForm, setshowForm] = useState(false)
  const [isEdit, setisEdit] = useState(false)
  const [mentions, setmentions] = useState([])
  const [mentioEdit, setmentioEdit] = useState([])

  //function pour recuperer toutes les mention

  const getMentions = async () => {
    const query = await window.fetch('/api/getAllMention')
    const json = await query.json()
    setmentions(json)
  }

  //use effect
  useEffect(() => {

    return () => {
      getMentions()
    }
  }, [])

  //data source du tableau
  const dataSource = mentions.map((value, index) => {

    return {
      key: value._id,
      nom: value.nom
    }

  })

  const showConfirDelete = (record) => {

    Modal.confirm({
      title: "Suppression",
      icon: <DeleteOutlined style={{ color: "red", fontSize: "20px" }} />,
      content: <>
        <Card style={{ border: "0px solid transparent" }} cover={"Etes vous sur de vouloir"}>
          <Meta description={<span>supprimer la mention <h4 style={{ color: "red" }}>{record.nom} &nbsp; ?</h4></span>}></Meta>
        </Card>
      </>,
      okText: "Supprimer",
      cancelText: "Annuler",
      onCancel: () => {
        Modal.destroyAll()
      },
      onOk: () => {
        const deleteMention = async () => {

          const stmt = await window.fetch(`/api/deleteMention/${record.key}`, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json"
            },
            method: "DELETE"

          })

          if (stmt) {
            getMentions()
            Modal.destroyAll()
          }

        }

        deleteMention()
      }
    })

  }

  // definition des entete du tableau
  const tableheader = [
    {
      key: "nom",
      dataIndex: "nom",
      title: "Liste des mentions",
      align: "center",
      colSpan: 3,
      sorter:(a,b)=>a.nom.length-b.nom.length,
      sortDirections:['descend']

    },
    {
      key: "action",
      title: "",
      align: "right",
      colSpan: 1,
      dataIndex: "action",
      render: (_, record) => (
        <Space size={'small'}>
          <Button key={record.key} type={"primary"} shape={'round'} onClick={() => { setisEdit(!isEdit); setmentioEdit(record)}} >
            <EditOutlined style={{ fontSize: "20px" }} />
          </Button>
          <Button key={`sup${record.key}`} type={"primary"} shape={'round'} danger={true} onClick={() => {
            showConfirDelete(record)
          }} >

            <DeleteOutlined style={{ fontSize: "20px" }} />

          </Button>
        </Space>
      )
    }
  ]



  // return
  return (
    showForm && !isEdit ?
      //affiche le formulaire d'ajout
      <Card  style={{ padding: "10px" }} cover={
        <div>
          <PlusCircleOutlined style={{fontSize:"20px"}}/>
          &nbsp;&nbsp;
            <span style={{ fontFamily: "monospace", fontSize: "16px", fontWeight: "bold" }}>Ajouter une Mention </span>
        </div>
    }>

      <Meta description={<WformMention show={showForm} setshow={setshowForm} getMentions={getMentions}  /> }/>

    </Card>

      :

      !showForm && isEdit ?
      //edition de formulaire

        <Card  style={{ padding: "10px" }} cover={
            <div>
              <EditOutlined style={{fontSize:"20px"}}/>
              &nbsp;&nbsp;
                <span style={{ fontFamily: "monospace", fontSize: "16px", fontWeight: "bold" }}>Edition de la Mention </span>
            </div>
        }>

          <Meta description={<WformEditMention getMentions={getMentions}
          values={mentioEdit} setvalues={setmentioEdit} show={isEdit} setshow={setisEdit} /> }/>

        </Card>

        :
        //sinon affiche le hidadercontent
        <>
          <Row>
            <Col span={24}>
              <HeadeContent titre={"Gestion des Mentions"}
                show={showForm} setshow={setshowForm} />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Table columns={tableheader} dataSource={dataSource}  pagination={{
                defaultPageSize:6,
                position:['topRight']
              }} />

            </Col>
          </Row>
        </>
  )
}

export default Wmention