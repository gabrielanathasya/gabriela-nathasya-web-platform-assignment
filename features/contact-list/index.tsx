import _ from "lodash"
import { Button, Form, Container, Row, Col } from "react-bootstrap"
import { CustomTable } from "components/CustomTable"
import { useEffect, useState } from "react"
import { useAppState, useActions } from "data/overmind"
import ModalComponent from "components/Modal"
import ContactForm from "./components/form"

import { debounce } from "utils/debounce"

const ContactList = () => {
  const basePath = "contact"

  const state: any = useAppState()
  const overmindActions: any = useActions()
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [editId, setEditId] = useState(null)

  const { dataContact } = state.contact

  const params = {
    filter: searchTerm,
    sortBy: "-createdDate",
    page: 1,
    size: 10,
  }

  useEffect(() => {
    // overmindActions.contact.getList()
  }, [])

  // Handler
  const handlePrev = () => {
    const current = dataContact.tablePaging.page
    if (current > 1) {
      // overmindActions.contact.getContacts({
      //   ...params,
      //   page: dataContact.tablePaging.page - 1
      // })
    }
  }
  const handleNext = () => {
    const current = dataContact.tablePaging.page
    if (current !== dataContact.tablePaging.totalPage) {
      // overmindActions.contact.getContacts({
      //   ...params,
      //   page: dataContact.tablePaging.page + 1
      // })
    }
  }
  const handleClick = (current: number) => {
    // overmindActions.contact.getContacts({
    //   ...params,
    //   page: current
    // })
  }

  const handleAddContact = () => {
    setEditId(null)
    setIsOpenForm(true)
  }

  const handleSubmitForm = () => {
    // fetchContacts()
    setIsOpenForm(false)
  }

  const handleDeleteContact = (id: any) => {
    console.log("delete", { id })
    // overmindActions.contact.deleteById({ id }).then(() => {
    //   fetchContacts()
    // })
  }

  const handleEditContact = (id: any) => {
    setEditId(id)
    setIsOpenForm(true)
  }

  const renderForm = () => {
    return <ContactForm handleSubmitForm={handleSubmitForm} id={editId} />
  }

  return (
    <Container className="px-md-5 py-md-5 mt-3">
      <Row className="align-items-center mb-3">
        <Col>
          <h1>Contact List</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button onClick={handleAddContact}>Add</Button>
        </Col>
      </Row>
      <Row>
        <Col className="mb-3" lg={6} md={6} sm={12}>
          <Form.Control
            type="text"
            onChange={debounce((e: any) => {
              setSearchTerm(e.target.value)
            }, 800)}
            placeholder="Search"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <CustomTable
            tableHead={dataContact.tableHead}
            tableBody={dataContact.tableBody}
            totalPage={dataContact.tablePaging.totalPage}
            current={dataContact.tablePaging.page}
            handlePrev={() => handlePrev()}
            handleNext={() => handleNext()}
            setCurrentPage={(current) => handleClick(current)}
            path={basePath}
            detailButton={false}
            children={undefined}
          />
        </Col>
      </Row>
      {isOpenForm && (
        <ModalComponent
          title={`${editId ? "Edit" : "Add"} Contact`}
          isShow={isOpenForm}
          fnCustomBody={renderForm}
          onCancel={() => setIsOpenForm(false)}
          cancelButtonText={undefined}
          confirmButtonText={undefined}
          onConfirm={() => {}}
          body={undefined}
          isDeleteMode={false}
          isShowFooter={false}
        />
      )}
    </Container>
  )
}

export default ContactList
