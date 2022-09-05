import * as Yup from "yup"

const requiredText = "${label} cannot be empty"
const matchedText = "${label} must not have special characters"

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, matchedText)
    .required(requiredText)
    .label("First name"),
  lastName: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, matchedText)
    .required(requiredText)
    .label("Last name"),
  phones: Yup.array()
    .of(Yup.string())
    .min(1, "At least one phone number is required")
    .required(requiredText)
    .label("Phone number"),
})

export default validationSchema
