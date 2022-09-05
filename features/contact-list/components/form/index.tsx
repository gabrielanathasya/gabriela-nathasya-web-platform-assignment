import React, { useState, useEffect } from "react"
import { useAppState, useActions } from "data/overmind"
import { useFormik } from "formik"
import { Button, Form, Row, Col } from "react-bootstrap"
import MultipleInput from "components/MultipleInput"
import validationSchema from "./validationSchema"
import { Wrapper } from "./style"

type ContactFormProps = {
  id: number | string | null
  handleSubmitForm: () => void
}

const ContactForm = ({ id, handleSubmitForm }: ContactFormProps) => {
  const state: any = useAppState()
  const overmindActions: any = useActions()
  const [initialValue, setInitialValue] = useState({
    firstName: "",
    lastName: "",
    phones: [],
  })

  useEffect(() => {
    if (id) {
      overmindActions.cv.getDetail({ id }).then(() => {
        const { detailData } = state.contact
        setInitialValue({
          firstName: detailData?.firstName || "",
          lastName: detailData?.lastName || "",
          phones: detailData?.phones || [],
        })
      })
    }
  }, [])

  const onSubmitForm = (values: any, actions: any) => {
    // actions.setSubmitting(false)
    // e.preventDefault()

    if (values) {
      if (id) {
        // overmindActions.cv
        //   .update({ id, user_id: userId, ...values })
        //   .then(() => {
        //     window?.localStorage?.removeItem("work_values")
        //     handleSubmitForm()
        //   })
      } else {
        // overmindActions.cv.create({ user_id: userId, ...values }).then(() => {
        //   window?.localStorage?.removeItem("work_values")
        //   handleSubmitForm()
        // })
      }
    } else {
      alert("Please fill out the form")
    }
  }

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: onSubmitForm,
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
  })

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = formik

  const handleAddPhone = (phoneValue: string) => {
    const newArray: any = values?.phones
    newArray.push(phoneValue)
    setFieldValue("phones", newArray)
  }

  const handleRemovePhone = (index: number) => {
    const newArray: any = values?.phones
    newArray?.splice(index, 1)
    setFieldValue("phones", newArray)
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit} className="work-form">
        <Row>
          <Col sm={12} md={6} className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstName"
              value={values?.firstName}
              onChange={handleChange}
            />
            {errors?.firstName && (
              <Form.Text className="text-danger">
                <>{errors?.firstName}</>
              </Form.Text>
            )}
          </Col>
          <Col sm={12} md={6} className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              name="lastName"
              value={values?.lastName}
              onChange={handleChange}
            />
            {errors?.lastName && (
              <Form.Text className="text-danger">
                <>{errors?.lastName}</>
              </Form.Text>
            )}
          </Col>
        </Row>

        <Row>
          <MultipleInput
            title="Phone Numbers"
            values={values?.phones}
            handleAddPhone={handleAddPhone}
            handleRemovePhone={handleRemovePhone}
            isViewMode={false}
          />
          {errors?.phones && (
            <Form.Text className="text-danger">
              <>{errors?.phones}</>
            </Form.Text>
          )}
        </Row>

        <Row className="mt-4">
          <Col className="d-flex justify-content-end">
            <Button className="submit-work-button" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  )
}

export default ContactForm
