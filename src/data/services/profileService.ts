export const profileHTTPService = ({
  baseGet,
  basePost,
  basePut,
  baseDelete,
}) => {
  const path = "user"

  const get = (params) => {
    let queryParams = new URLSearchParams(params).toString()

    const pathUrl = path + "?" + queryParams
    return baseGet(pathUrl)
  }
  const getDetail = ({ id }) => {
    const pathUrl = path + "/" + id
    return baseGet(pathUrl)
  }

  const create = (spec) => {
    const pathUrl = path + "/"
    return basePost(pathUrl, spec)
  }

  const update = ({ id, spec }) => {
    const pathUrl = path + "/" + id
    return basePut(pathUrl, spec)
  }

  const deleteData = ({ id }) => {
    const pathUrl = path + "/" + id
    return baseDelete(pathUrl)
  }

  return { get, getDetail, create, update, deleteData }
}
