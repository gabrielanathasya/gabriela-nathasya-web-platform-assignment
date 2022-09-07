import { useQuery, useMutation } from "@apollo/client"
import { Button, Form, Container, Row, Col } from "react-bootstrap"
import { CustomTable } from "components/CustomTable"
import { useEffect, useState } from "react"
import { useAppState, useActions } from "data/overmind"
import ModalComponent from "components/Modal"
import SpinnerComponent from "components/Spinner"
import ContactForm from "./components/form"
import FaveContactList from "./components/faveList"
import { GET_CONTACT_LIST, DELETE_CONTACT } from "queries/contact"
import { debounce } from "utils/debounce"

const ContactList = () => {
  const basePath = "contact"
  const state: any = useAppState()
  const overmindActions: any = useActions()
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const size = 10
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [editId, setEditId] = useState<any>(null)

  const [faveIds, setFaveIds] = useState([])

  const { dataContact } = state.contact

  const variables = {
    limit: size,
    offset: (page - 1) * size,
    where: searchTerm
      ? { first_name: { _like: `%${searchTerm}%` }, id: { _nin: faveIds } }
      : { id: { _nin: faveIds } },
  }
  const [deleteContact] = useMutation(DELETE_CONTACT)
  const { data: totalData, refetch: refetchTotal } = useQuery(
    GET_CONTACT_LIST,
    {
      variables: {
        where: { id: { _nin: faveIds } },
      },
    }
  )
  const { loading, error, data, refetch } = useQuery(GET_CONTACT_LIST, {
    variables,
  })

  if (error) {
    console.error(`[FAIL GET CONTACT LIST ${error.message}]`, error)
    alert("Get List Failed")
  }

  useEffect(() => {
    let faveIdsInit: any = window?.localStorage?.getItem("fave_ids")
    faveIdsInit = faveIdsInit ? JSON.parse(faveIdsInit) : []
    setFaveIds(faveIdsInit)
  }, [])

  useEffect(() => {
    if (data && totalData) {
      overmindActions.contact.setContactList({
        data,
      })
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

  const handleRefetch = () => {
    refetch({
      limit: size,
      offset: (page - 1) * size,
      where: searchTerm
        ? { first_name: { _like: `%${searchTerm}%` }, id: { _nin: faveIds } }
        : { id: { _nin: faveIds } },
    })
    refetchTotal()
  }

  const handleSubmitForm = () => {
    handleRefetch()
    setIsOpenForm(false)
  }

  const handleFavourite = (id: any) => {
    console.log("fave", { id })

    let faveIds: any = window?.localStorage?.getItem("fave_ids")
    faveIds = faveIds ? JSON.parse(faveIds) : []
    faveIds?.push(id)
    window?.localStorage?.setItem("fave_ids", JSON.stringify(faveIds))
    setFaveIds(faveIds)

    handleRefetch()
  }

  const handleDelete = (id: any) => {
    deleteContact({
      variables: { id },
    }).then(() => {
      handleRefetch()
    })
  }

  const handleEdit = (id: any) => {
    setEditId(id)
    setIsOpenForm(true)
  }

  const renderForm = () => {
    return <ContactForm handleSubmitForm={handleSubmitForm} id={editId} />
  }

  return (
    <Container className="px-md-5 py-md-5 mt-3">
      {loading && <SpinnerComponent />}
      <FaveContactList
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleRefetch={handleRefetch}
        faveIds={faveIds}
      />

      <Row>
        <Col>
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
                detailButton={true}
                children={undefined}
                useManualPagination={false}
                handleFavourite={handleFavourite}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                isFave={false}
              />
            </Col>
          </Row>
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
