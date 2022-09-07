import React, { ReactNode } from "react"
import { Modal, Button, Row, NavProps } from "react-bootstrap"

type ModalProps = {
  title: string | undefined
  body: string | undefined
  fnCustomBody: (() => ReactNode) | undefined
  cancelButtonText: string | undefined
  confirmButtonText: string | undefined
  isShow: boolean
  onCancel: () => void | undefined
  onConfirm: () => void | undefined
  isShowFooter: boolean
}

const ModalComponent = ({
  title = "Title Placeholder",
  body = "Body Placeholder",
  fnCustomBody,
  cancelButtonText = "Cancel",
  confirmButtonText = "Confirm",
  isShow,
  onCancel,
  onConfirm,
  isShowFooter = true,
}: ModalProps) => {
  return (
    <Modal
      show={isShow}
      onHide={onCancel}
      aria-labelledby="contained-modal-title-center"
      scrollable
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        {fnCustomBody ? fnCustomBody() : <p>{body}</p>}
      </Modal.Body>

      {isShowFooter && cancelButtonText && confirmButtonText && (
        <Modal.Footer>
          <Button
            className="mx-1"
            type="submit"
            variant="primary"
            onClick={onConfirm}
          >
            {confirmButtonText}
          </Button>
          <Button className="mx-1" variant="secondary" onClick={onCancel}>
            {cancelButtonText}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  )
}

export default ModalComponent
