import React from "react"
import { Button, Row, Col } from "react-bootstrap"
import { Wrapper } from "./style"
import { IoPersonOutline } from "react-icons/io5"

type EmptySectionProps = {
  title: string | undefined
  desc: string | undefined
  handleButtonClick: () => void
  buttonMessage: string | undefined
  isShowButton: boolean
}

const EmptySection = ({
  title,
  desc,
  handleButtonClick,
  buttonMessage,
  isShowButton,
}: EmptySectionProps) => {
  return (
    <Wrapper>
      <Row className="mt-3 section-empty">
        <Row className="mb-4 d-flex justify-content-center align-items-center">
          <IoPersonOutline className="icon-lg illustration" />
        </Row>
        <Row className="mb-2 empty-title d-flex justify-content-center align-items-center">
          {title}
        </Row>
        <Row className="mb-4 empty-desc d-flex justify-content-center align-items-center">
          {desc}
        </Row>
        {isShowButton && (
          <Row className="empty-button-row">
            <Col className=" d-flex justify-content-center align-items-center">
              <Button
                variant="primary"
                className="empty-button"
                onClick={handleButtonClick}
              >
                {buttonMessage}
              </Button>
            </Col>
          </Row>
        )}
      </Row>
    </Wrapper>
  )
}

export default EmptySection
