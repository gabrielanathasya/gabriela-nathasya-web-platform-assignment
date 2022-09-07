import { Row, Col, Table, Pagination } from "react-bootstrap"
import { useEffect, useState } from "react"
import { Wrapper } from "./style"
import {
  IoChevronDownOutline,
  IoTrashBin,
  IoPencil,
  IoStar,
  IoStarOutline,
} from "react-icons/io5"
import EmptySection from "components/EmptySection"

type tableHeadProps = {
  item: string
}

type detailButtonProps = {
  handleFavourite: (id: any) => void
  handleEdit: (id: any) => void
  handleDelete: (id: any) => void
  id: any
  isFave: boolean
}

type tableRowProps = {
  data: any
  id: any
  detailButton: boolean
  handleFavourite: (id: any) => void
  handleEdit: (id: any) => void
  handleDelete: (id: any) => void
  isFave: boolean
}

type TableDetailMobileProps = {
  rowData: any
  tableHead: any
  detailButton: boolean
  id: any
  handleFavourite: (id: any) => void
  handleEdit: (id: any) => void
  handleDelete: (id: any) => void
  isFave: boolean
}

type CustomTableProps = {
  tableHead: any
  tableBody: any
  totalPage: any
  current: number
  pageSize: number
  handlePrev: () => void
  handleNext: () => void
  setCurrentPage: (current: number) => void
  detailButton: boolean
  children: any
  useManualPagination: boolean
  handleFavourite: (id: any) => void
  handleEdit: (id: any) => void
  handleDelete: (id: any) => void
  isFave: boolean
}

const TableHeadItem = ({ item }: tableHeadProps) => {
  return (
    <th className="text-lg" title={item}>
      {item}
    </th>
  )
}

const DetailButton = ({
  handleFavourite,
  handleEdit,
  handleDelete,
  id,
  isFave,
}: detailButtonProps) => {
  return (
    <div className="w-full d-flex justify-content-end align-items-centers">
      {isFave ? (
        <IoStar
          className="icon-sm detail-button"
          onClick={() => handleFavourite(id)}
        />
      ) : (
        <IoStarOutline
          className="icon-sm detail-button"
          onClick={() => handleFavourite(id)}
        />
      )}
      <IoPencil
        className="icon-sm detail-button"
        onClick={() => handleEdit(id)}
      />
      <IoTrashBin
        className="icon-sm detail-button"
        onClick={() => handleDelete(id)}
      />
    </div>
  )
}
const TableRow = ({
  data,
  id,
  detailButton,
  handleFavourite,
  handleEdit,
  handleDelete,
  isFave,
}: tableRowProps) => {
  return (
    <tr>
      {data?.map((item: any, key: any) => {
        return (
          <td className="cellDesktop" key={key}>
            {Array.isArray(item)
              ? item?.map((subItem: any) => {
                  return <p key={subItem}>{subItem}</p>
                })
              : item}
          </td>
        )
      })}
      {detailButton && (
        <td
          className="cellDesktop"
          // style={{
          //   display: "flex",
          //   justifyContent: "center",
          //   margin: "0",
          // }}
        >
          <DetailButton
            handleFavourite={handleFavourite}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            id={id}
            isFave={isFave}
          />
        </td>
      )}
    </tr>
  )
}

const TableDetailMobile = ({
  rowData,
  tableHead,
  detailButton,
  id,
  handleFavourite,
  handleEdit,
  handleDelete,
  isFave,
}: TableDetailMobileProps) => {
  return (
    <Row className="d-flex justify-content-center align-items-center">
      <Col
        className="border w-full d-inline-block mt-3 ml-1 mr-1 pt-2 pb-2"
        style={{ fontSize: "13px" }}
      >
        {rowData?.slice(2).map((item: any, index: number) => (
          <Row className="m-1" key={index}>
            <Col xs={6} className="font-weight-bold">
              {tableHead[index + 2]}
            </Col>
            <Col xs={6} className="text-right cell">
              {Array.isArray(item)
                ? item?.map((subItem: any) => {
                    return <p key={subItem}>{subItem}</p>
                  })
                : item}
            </Col>
          </Row>
        ))}
      </Col>
      {detailButton && (
        <Row className="m-0 p-0">
          <Col className="mt-3 d-flex justify-content-end p-0">
            <DetailButton
              handleFavourite={handleFavourite}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              id={id}
              isFave={isFave}
            />
          </Col>
        </Row>
      )}
    </Row>
  )
}

export const CustomTable = ({
  tableHead,
  tableBody,
  totalPage,
  current,
  pageSize,
  handlePrev,
  handleNext,
  setCurrentPage,
  detailButton = true,
  children,
  useManualPagination,
  handleFavourite,
  handleEdit,
  handleDelete,
  isFave,
}: CustomTableProps) => {
  let active = current
  let items: any = []
  const [tableDetailKey, setTableDetailKey] = useState(null)

  const handleOpenTableDetail = (key: any) => {
    if (tableDetailKey === key) {
      setTableDetailKey(null)
    } else {
      setTableDetailKey(key)
    }
  }

  useEffect(() => {
    setTableDetailKey(null)
  }, [tableBody])

  const renderPaginationItem = (number: number | null) => {
    if (number) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          activeLabel=""
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      )
    } else {
      items.push(<Pagination.Ellipsis />)
    }
  }

  const renderPagination = () => {
    //first page
    const firstPage = 1
    renderPaginationItem(firstPage)

    //active first page
    if (active === firstPage && active + 1 < totalPage) {
      renderPaginationItem(active + 1)

      if (active + 2 < totalPage) {
        renderPaginationItem(null)
      }
    }

    //active page in between
    if (firstPage < active && active < totalPage) {
      //1 page before active
      if (active - 1 > firstPage) {
        //ellipsis
        if (active - 2 > firstPage) {
          renderPaginationItem(null)
        }
        renderPaginationItem(active - 1)
      }

      renderPaginationItem(active)

      //1 page after active
      if (active + 1 < totalPage) {
        renderPaginationItem(active + 1)
        //ellipsis
        if (active + 2 < totalPage) {
          renderPaginationItem(null)
        }
      }
    }

    //active last page
    if (active === totalPage && active - 1 > firstPage) {
      if (active - 2 > firstPage) {
        renderPaginationItem(null)
      }
      renderPaginationItem(active - 1)
    }

    //last page
    if (totalPage > firstPage) {
      renderPaginationItem(totalPage)
    }
  }

  renderPagination()

  if (tableBody?.length === 0) {
    return (
      <EmptySection
        title="No Contact"
        desc="There is no contact at the moment."
        buttonMessage={undefined}
        isShowButton={false}
        handleButtonClick={() => {}}
      />
    )
  }

  return (
    <Wrapper>
      <div className="d-none d-lg-block w-full p-0">
        <Table striped borderless hover responsive="xl">
          <thead>
            <tr>
              {tableHead.map((data: any) => {
                return <TableHeadItem key={data} item={data} />
              })}
              {detailButton && <th></th>}
            </tr>
          </thead>
          <tbody>
            {children ||
              (tableBody &&
                tableBody.map((data: any, key: any) => (
                  <TableRow
                    key={key}
                    data={data?.rowData}
                    id={data?.id}
                    detailButton={detailButton}
                    handleFavourite={handleFavourite}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    isFave={isFave}
                  />
                )))}
          </tbody>
        </Table>
      </div>

      <div className="d-lg-none">
        <Row
          style={{
            backgroundColor: "#e9ecef",
            color: "#394858",
          }}
          className="font-weight-bold p-3"
        >
          <Col xs={5} className="cellHeader">
            {tableHead[0]}
          </Col>
          <Col xs={7} className="cellHeader">
            {tableHead[1]}
          </Col>
        </Row>
        {children ||
          (tableBody &&
            tableBody.map((row: any, key: any) => {
              const flag = useManualPagination
                ? key > (current - 1) * pageSize - 1 && key < current * pageSize
                : true
              if (flag) {
                return (
                  <Row
                    className="p-3 justify-content-center"
                    key={key}
                    style={{
                      cursor: "pointer",
                      borderTop: "1px solid #DEE2E6",
                    }}
                    onClick={() => handleOpenTableDetail(key)}
                  >
                    <Col xs={5} className="cell">
                      {row?.rowData[0]}
                    </Col>
                    <Col xs={6} className="cell">
                      {row?.rowData[1]}
                    </Col>
                    <Col xs={1} className="cell p-0">
                      <IoChevronDownOutline
                        className="icon-sm"
                        style={{
                          float: "right",
                          transitionDuration: "0.5s",
                          transitionTimingFunction: "ease",
                          transform:
                            tableDetailKey === key
                              ? "rotate(180deg)"
                              : undefined,
                        }}
                      />
                    </Col>
                    {tableDetailKey === key && (
                      <TableDetailMobile
                        rowData={row?.rowData}
                        tableHead={tableHead}
                        id={row?.id}
                        detailButton={detailButton}
                        handleFavourite={handleFavourite}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        isFave={isFave}
                      />
                    )}
                  </Row>
                )
              }
            }))}
      </div>
      <Pagination
        size="sm"
        className="justify-content-md-end justify-content-sm-end"
      >
        <Pagination.Prev onClick={handlePrev} />
        {items}
        <Pagination.Next onClick={handleNext} />
      </Pagination>
    </Wrapper>
  )
}
