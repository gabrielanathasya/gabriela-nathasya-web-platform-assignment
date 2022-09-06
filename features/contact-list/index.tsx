import { useQuery, gql } from "@apollo/client"
import { Button, Form, Container, Row, Col } from "react-bootstrap"
import { CustomTable } from "components/CustomTable"
import { useEffect, useState } from "react"
import { useAppState, useActions } from "data/overmind"
import ModalComponent from "components/Modal"
import SpinnerComponent from "components/Spinner"
import ContactForm from "./components/form"
import { GET_CONTACT_LIST } from "queries/contact"
import { debounce } from "utils/debounce"

const ContactList = () => {
  const basePath = "contact"
  const state: any = useAppState()
  const overmindActions: any = useActions()
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const size = 10
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const { dataContact } = state.contact

  const { data: totalData } = useQuery(GET_CONTACT_LIST)
  const { loading, error, data } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: size,
      offset: (page - 1) * size,
      where: searchTerm
        ? { first_name: { _like: `%${searchTerm}%` } }
        : undefined,
    },
  })

  if (error) {
    console.error(`[FAIL GET CONTACT LIST ${error.message}]`, error)
    alert("Get List Failed")
  }

  useEffect(() => {
    if (data && totalData) {
      overmindActions.contact.setContactList({ totalData, page, size, data })
    }
  }, [data, totalData])

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }
  const handleNext = () => {
    const totalPage = Math.ceil(totalData?.contact?.length / size)
    if (page !== totalPage) {
      overmindActions.contact.setPaging(page + 1)
      setPage(page + 1)
    }
  }
  const handleClick = (current: number) => {
    setPage(current)
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
      {loading && <SpinnerComponent />}
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
            totalPage={Math.ceil(totalData?.contact?.length / size)}
            current={page}
            pageSize={size}
            handlePrev={() => handlePrev()}
            handleNext={() => handleNext()}
            setCurrentPage={(current) => handleClick(current)}
            path={basePath}
            detailButton={false}
            children={undefined}
            useManualPagination={false}
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
