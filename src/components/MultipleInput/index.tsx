import React from "react"
import { Container, Form, Row, Col } from "react-bootstrap"
import Image from "next/image"
import { useState } from "react"
import { useAppState } from "data/overmind"
import { IoAddCircle } from "react-icons/io5"

const crossIcon = "/static/images/cross_icon.svg"

type MultipleInputProps = {
  title: string
  values: any
  handleAddPhone: (phoneValue: string) => void
  handleRemovePhone: (index: number) => void
  isViewMode: boolean
}

const MultipleInput = ({
  title = "Title Placeholder",
  values = [],
  handleAddPhone,
  handleRemovePhone,
  isViewMode = false,
}: MultipleInputProps) => {
  const state: any = useAppState()
  const [phoneValue, setPhoneValue] = useState<any>("")

  const handleAdd = () => {
    handleAddPhone(phoneValue)
    setPhoneValue("")
  }

  const renderTag = (value: any, i: number) => {
    return (
      <div
        key={i}
        className="d-flex justify-content-center align-items-center p-1 mr-1 mb-1 rounded-sm"
        style={{ background: "#CBCBCB", marginRight: "8px" }}
      >
        <span
          style={{
            fontSize: "12px",
            maxWidth: "100px",
            overflow: "hidden",
            textDecoration: "none",
            color: "black",
          }}
          className="m-0"
        >
          {value}
        </span>
        {!isViewMode && (
          <div
            className="ml-1 d-flex justify-content-center align-items-center"
            onClick={() => handleRemovePhone(i)}
          >
            <Image
              style={{
                objectFit: "contain",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              src={crossIcon}
              width="10"
              height="10"
              alt="crossIcon"
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form.Label>{title}</Form.Label>
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <Form.Control
                type="text"
                placeholder="Phone Value"
                name="phoneValue"
                value={phoneValue}
                onChange={(e) => {
                  setPhoneValue(e.target.value)
                }}
              />
            </Col>
            <Col className="d-flex  align-items-center">
              <IoAddCircle
                className="icon-sm"
                style={{ cursor: "pointer" }}
                onClick={handleAdd}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <div className="border rounded-sm p-2 mt-3">
        <p style={{ fontSize: "12px" }} className="mt-1 mb-1">
          {values?.length > 0
            ? "Added phone numbers:"
            : "No phone numbers added"}
        </p>
        <div className="d-flex flex-wrap">
          {values?.map((value: any, i: number) => {
            return renderTag(value, i)
          })}
        </div>
      </div>
    </Container>
  )
}

export default MultipleInput
