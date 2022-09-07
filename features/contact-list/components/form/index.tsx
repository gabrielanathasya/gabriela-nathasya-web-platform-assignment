import React, { useState, useEffect } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { useAppState, useActions } from "data/overmind"
import { useFormik } from "formik"
import { Button, Form, Row, Col } from "react-bootstrap"
import MultipleInput from "components/MultipleInput"
import validationSchema from "./validationSchema"
import { Wrapper } from "./style"
import SpinnerComponent from "components/Spinner"
import {
  INSERT_CONTACT,
  GET_CONTACT_DETAIL,
  EDIT_CONTACT,
  ADD_PHONE_NUMBER,
} from "queries/contact"

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
  const { unfilteredDataContact, detailData: detailDataState } = state.contact

  const { data: detailData, loading: loadingDetail } = useQuery(
    GET_CONTACT_DETAIL,
    {
      variables: {
        id,
      },
    }
  )

  const [insertContact, { loading, error }] = useMutation(INSERT_CONTACT)

  const [editContact, { loading: loadingEdit, error: errorEdit }] =
    useMutation(EDIT_CONTACT)

  // const [
  //   editPhoneNumber,
  //   { loading: loadingEditPhone, error: errorEditPhone },
  // ] = useMutation(EDIT_PHONE_NUMBER)

  const [addPhoneNumber, { loading: loadingAddPhone, error: errorAddPhone }] =
    useMutation(ADD_PHONE_NUMBER)

  if (error) {
    alert("Insert Contact Failed")
  }
  if (errorEdit) {
    alert("Edit Contact Failed")
  }
  // if (errorEditPhone) {
  //   alert("Remove phone number failed")
  // }
  if (errorAddPhone) {
    alert("Add phone number failed")
  }

  useEffect(() => {
    if (detailData) {
      overmindActions.contact.setDetailData({
        detailData,
      })
    }
  }, [detailData])

  useEffect(() => {
    setInitialValue({
      firstName: detailDataState?.first_name || "",
      lastName: detailDataState?.last_name || "",
      phones: detailDataState?.phones || [],
    })
  }, [detailDataState])

  const onSubmitForm = (values: any, actions: any) => {
    if (values) {
      const isExist = unfilteredDataContact?.find(
        (item: any) =>
          item?.firstName === values?.firstName &&
          item?.lastName === values?.lastName
      )

      if (isExist) {
        alert("Name must be unique")
      } else {
        if (id) {
          editContact({
            variables: {
              id,
              _set: {
                first_name: values?.firstName,
                last_name: values?.lastName,
              },
            },
          })
        } else {
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
      if (id) {
        addPhoneNumber({
          variables: {
            contact_id: id,
            phone_number: phoneValue,
          },
        })
      }
      const newArray: any = [...values?.phones]
      newArray.push(phoneValue)
      setFieldValue("phones", newArray)
    }
  }

  const handleRemovePhone = (index: number) => {
    // if (id) {
    //   editPhoneNumber({
    //     variables: {
    //       pk_columns: {
    //         number: values?.phones[index],
    //         contact_id: id,
    //       },
    //       new_phone_number: "",
    //     },
    //   })
    // }

    const newArray: any = [...values?.phones]
    newArray?.splice(index, 1)
    setFieldValue("phones", newArray)
  }

  return (
    <Wrapper>
      {(loading || loadingDetail || loadingEdit || loadingAddPhone) && (
        <SpinnerComponent />
      )}
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
            isViewMode={!!id}
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
