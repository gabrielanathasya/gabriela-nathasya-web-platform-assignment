import { Wrapper } from "./style"
import React from "react"
import { Spinner } from "react-bootstrap"

const SpinnerComponent = () => {
  return (
    <Wrapper>
      <Spinner animation="border" variant="primary" />
    </Wrapper>
  )
}

export default SpinnerComponent
