import { Row, Col, Form } from "react-bootstrap"
import { useQuery, useMutation } from "@apollo/client"
import { CustomTable } from "components/CustomTable"
import { useEffect, useState } from "react"
import { useAppState, useActions } from "data/overmind"
import SpinnerComponent from "components/Spinner"
import { GET_CONTACT_LIST } from "queries/contact"
import { debounce } from "utils/debounce"

type FaveContactListProps = {
  handleEdit: (id: any) => void
  handleDelete: (id: any) => void
  handleRefetch: () => void
  faveIds: any
}

const FaveContactList = ({
  handleEdit,
  handleDelete,
  handleRefetch,
  faveIds,
}: FaveContactListProps) => {
  const state: any = useAppState()
  const overmindActions: any = useActions()
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const size = 5
  const { dataFaveContact } = state.contact

  const { data: totalData, refetch: refetchTotal } = useQuery(
    GET_CONTACT_LIST,
    {
      variables: {
        where: searchTerm
          ? { first_name: { _ilike: `%${searchTerm}%` }, id: { _in: faveIds } }
          : { id: { _in: faveIds } },
      },
    }
  )
  const {
    loading,
    data,
    error,
    refetch: refetchFaveList,
  } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: size,
      offset: (page - 1) * size,
      where: searchTerm
        ? { first_name: { _ilike: `%${searchTerm}%` }, id: { _in: faveIds } }
        : { id: { _in: faveIds } },
    },
  })

  if (error) {
    // console.error(`[FAIL GET CONTACT LIST ${error.message}]`, error)
    alert("Get List Failed")
  }

  useEffect(() => {
    if (data && totalData) {
      overmindActions.contact.setFaveContactList({
        data,
      })
    }
  }, [data, totalData])

  useEffect(() => {
    if (dataFaveContact?.tableBody?.length === 0) {
      handlePrev()
    }
  }, [dataFaveContact?.tableBody])

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }
  const handleNext = () => {
    const totalPage = Math.ceil(faveIds?.length / size)
    if (page !== totalPage) {
      setPage(page + 1)
    }
  }
  const handleClick = (current: number) => {
    setPage(current)
  }

  const handleUnfavourite = (id: any) => {
    let faveIds: any = window?.localStorage?.getItem("fave_ids")
    faveIds = faveIds ? JSON.parse(faveIds) : []
    faveIds = faveIds?.filter((item: any) => item !== id)
    window?.localStorage?.setItem("fave_ids", JSON.stringify(faveIds))
    handleRefetch()
    refetchTotal({
      where: { id: { _in: faveIds } },
    })
    refetchFaveList({
      limit: size,
      offset: (page - 1) * size,
      where: { id: { _in: faveIds } },
    })
  }

  return (
    <Row className="mb-5">
      {loading && <SpinnerComponent />}
      <Col>
        <Row className="align-items-center mb-3">
          <Col>
            <h1>Favourite List</h1>
          </Col>
        </Row>
        <Row>
          <Col className="mb-3" lg={6} md={6} sm={12}>
            <Form.Control
              type="text"
              onChange={debounce((e: any) => {
                setSearchTerm(e.target.value)
              }, 800)}
              placeholder="Search first name..."
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CustomTable
              tableHead={dataFaveContact.tableHead}
              tableBody={dataFaveContact.tableBody}
              totalPage={Math.ceil(faveIds?.length / size)}
              current={page}
              pageSize={size}
              handlePrev={() => handlePrev()}
              handleNext={() => handleNext()}
              setCurrentPage={(current) => handleClick(current)}
              detailButton={true}
              children={undefined}
              useManualPagination={false}
              handleFavourite={handleUnfavourite}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              isFave={true}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default FaveContactList
