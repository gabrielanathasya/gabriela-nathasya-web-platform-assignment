import React, { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { useAppState, useActions } from "data/overmind"
import { useFormik } from "formik"
import { Button, Form, Row, Col } from "react-bootstrap"
import MultipleInput from "components/MultipleInput"
import validationSchema from "./validationSchema"
import { Wrapper } from "./style"
import SpinnerComponent from "components/Spinner"
import { INSERT_CONTACT } from "queries/contact"

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
  const [insertContact, { data, loading, error }] = useMutation(INSERT_CONTACT)

  if (error) {
    console.error(`[FAIL INSERT CONTACT ${error.message}]`, error)
    alert("Insert Contact Failed")
  }

  useEffect(() => {
    if (id) {
      // FETCH DETAIL
      // overmindActions.cv.getDetail({ id }).then(() => {
      //   const { detailData } = state.contact
      //   setInitialValue({
      //     firstName: detailData?.firstName || "",
      //     lastName: detailData?.lastName || "",
      //     phones: detailData?.phones || [],
      //   })
      // })
    }
  }, [])

  const onSubmitForm = (values: any, actions: any) => {
    // actions.setSubmitting(false)
    // e.preventDefault()

    if (values) {
      if (id) {
        // EDIT
        // overmindActions.cv
        //   .update({ id, user_id: userId, ...values })
        //   .then(() => {
        //     window?.localStorage?.removeItem("work_values")
        //     handleSubmitForm()
        //   })
      } else {
        // CREATE
        insertContact({
          variables: {
            first_name: values?.firstName,
            last_name: values?.lastName,
            phones: values?.phones?.map((phone: any) => ({
              number: phone,
            })),
          },
        }).then(() => {
          handleSubmitForm()
        })
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
    if (phoneValue) {
      const newArray: any = values?.phones
      newArray.push(phoneValue)
      setFieldValue("phones", newArray)
    }
  }

  const handleRemovePhone = (index: number) => {
    const newArray: any = values?.phones
    newArray?.splice(index, 1)
    setFieldValue("phones", newArray)
  }

  return (
    <Wrapper>
      {loading && <SpinnerComponent />}
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
            <Button className="submit-button" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  )
}

export default ContactForm
