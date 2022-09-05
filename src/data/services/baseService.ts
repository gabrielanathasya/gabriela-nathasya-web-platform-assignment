export const baseService = ({ get, post, put, deleteData }) => {
  const basePost = (pathUrl: string, spec: any = {}, config: any = {}) => {
    return post(pathUrl, spec, config)
  }

  const basePut = (pathUrl: string, spec: any = {}, config: any = {}) => {
    return put(pathUrl, spec, config)
  }

  const baseGet = (pathUrl: string, spec: any = {}, config: any = {}) => {
    return get(pathUrl, config)
  }

  const baseDelete = (pathUrl: string, spec: any = {}, config: any = {}) => {
    return deleteData(pathUrl, config)
  }

  return { basePost, basePut, baseDelete, baseGet }
}
