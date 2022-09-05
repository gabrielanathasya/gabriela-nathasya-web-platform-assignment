import axios from "axios"

const ErrorContanctingServer =
  "There's an error while contacting server. Please try again."

export const HttpClient = (baseURL: string) => {
  const _http = axios.create({
    baseURL,
  })
  _http.interceptors.response.use(
    (res) => res,
    (err) => handleAPIError(err)
  )

  const handleAPIError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
    } else if (error.request) {
      // The request was made but no response was received
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("API call error", error.message)
    }
    return Promise.reject(error)
  }

  const handleAPIStatus = (res) => {
    if (res && "status" in res && res.status >= 200 && res.status < 300) {
      return Promise.resolve(res)
    }
    return Promise.reject(res)
  }

  const post = (url, spec, config = {}) => {
    return _http
      .post(url, spec, config)
      .then((res) => {
        return handleAPIStatus(res)
      })
      .catch((err) => {
        if (err.response) {
          const { status, data } = err.response

          if (status == 400 && data && typeof data === "string")
            return Promise.reject(err.response.data)
          else return Promise.reject(ErrorContanctingServer)
        }
        return Promise.reject(ErrorContanctingServer)
      })
  }

  const put = (url, spec, config = {}) => {
    return _http
      .put(url, spec, config)
      .then((res) => {
        return handleAPIStatus(res)
      })
      .catch((err) => {
        if (err.response) {
          const { status, data } = err.response

          if (status == 400 && data && typeof data === "string")
            return Promise.reject(err.response.data)
          else return Promise.reject(ErrorContanctingServer)
        }
        return Promise.reject(ErrorContanctingServer)
      })
  }

  const get = (url, config = {}) => {
    return _http
      .get(url, config)
      .then((res) => {
        return handleAPIStatus(res)
      })
      .catch((err) => {
        if (err.response) {
          const { status, data } = err.response

          if (status == 400 && data && typeof data === "string")
            return Promise.reject(err.response.data)
          else return Promise.reject(ErrorContanctingServer)
        }
        return Promise.reject(ErrorContanctingServer)
      })
  }

  const deleteData = (url, config = {}) => {
    return _http
      .delete(url, config)
      .then((res) => {
        return handleAPIStatus(res)
      })
      .catch((err) => {
        if (err.response) {
          const { status, data } = err.response

          if (status == 400 && data && typeof data === "string")
            return Promise.reject(err.response.data)
          else return Promise.reject(ErrorContanctingServer)
        }
        return Promise.reject(ErrorContanctingServer)
      })
  }

  return { get, post, put, deleteData }
}
