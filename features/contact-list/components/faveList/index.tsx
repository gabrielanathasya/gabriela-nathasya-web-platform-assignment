import { Button, Container, Row, Col } from "react-bootstrap"
import { CustomTable } from "components/CustomTable"
import { useEffect, useState } from "react"
import { useAppState, useActions } from "data/overmind"

type FaveContactListProps = {
  handleEdit: (id: any) => void
  handleDelete: (id: any) => void
}

const FaveContactList = ({
  handleEdit,
  handleDelete,
}: FaveContactListProps) => {
  const basePath = "contact"
  const state: any = useAppState()
  const overmindActions: any = useActions()
  const [page, setPage] = useState(1)
  const size = 5
  const { dataFaveContact } = state.contact
  console.log({ dataFaveContact })

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }
  const handleNext = () => {
    const totalPage = Math.ceil(dataFaveContact?.tablePaging?.totalPage / size)
    if (page !== totalPage) {
      setPage(page + 1)
    }
  }
  const handleClick = (current: number) => {
    setPage(current)
  }

  const handleUnfavourite = (id: any) => {
    console.log("unfave", { id })

    let faveIds: any = window?.localStorage?.getItem("fave_ids")
    faveIds = faveIds ? JSON.parse(faveIds) : []
    faveIds = faveIds?.filter((item: any) => item !== id)
    window?.localStorage?.setItem("fave_ids", JSON.stringify(faveIds))

    // overmindActions.contact.deleteById({ id }).then(() => {
    //   fetchContacts()
    // })
  }

  return (
    <Row className="mb-5">
      <Col>
        <Row className="align-items-center mb-3">
          <Col>
            <h1>Favourite Contact List</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <CustomTable
              tableHead={dataFaveContact.tableHead}
              tableBody={dataFaveContact.tableBody}
              totalPage={Math.ceil(
                dataFaveContact?.tablePaging?.totalPage / size
              )}
              current={page}
              pageSize={size}
              handlePrev={() => handlePrev()}
              handleNext={() => handleNext()}
              setCurrentPage={(current) => handleClick(current)}
              path={basePath}
              detailButton={true}
              children={undefined}
              useManualPagination={true}
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
