export const getCVs = async ({ state, effects }, params) => {
  state.isRequesting = true
  await effects.cv.services
    .getCVs(params)
    .then((res) => {
      const processedData = res.data?.map((data) => {
        return {
          id: data?.cv_id,
          startDate: parseInt(data?.start_date) || null,
          endDate: parseInt(data?.end_date) || null,
          jobTitle: data?.job_title,
          jobDescription: data?.job_description,
          companyLogoURL: data?.company_logo,
          company: data?.company,
        }
      })
      state.cv.cvs = processedData
    })
    .catch((error) => {
      console.error("[FAIL GET DATA]", error)
      alert("Get Work Experiences Failed")
    })
  state.isRequesting = false
}

export const getDetail = async ({ state, effects }, { id }) => {
  state.isRequesting = true

  await effects.cv.services
    .detail({ id })
    .then((res) => {
      const detail = res.data
      state.cv.detailData = detail ? detail[0] : null
    })
    .catch((error) => {
      console.error("[FAIL GET DETAIL]", error)
      alert("Get Detail Failed")
    })

  state.isRequesting = false
}

export const create = async ({ state, effects }, reqPayload) => {
  state.isRequesting = true

  await effects.cv.services.create(reqPayload).catch((error) => {
    console.error("[FAIL CREATE]", error)
    alert("Insert Failed")
  })

  state.isRequesting = false
}

export const update = async ({ state, effects }, spec) => {
  state.isRequesting = true

  const id = spec.id
  delete spec["id"]

  await effects.cv.services.update({ id, spec }).catch((error) => {
    console.error("[FAIL UPDATE]", error)
    alert("Update Failed")
  })

  state.isRequesting = false
}

export const deleteById = async ({ state, effects }, { id }) => {
  state.isRequesting = true

  await effects.cv.services.delete({ id }).catch((error) => {
    console.error("[FAIL DELETE]", error)
    alert("Delete Failed")
  })

  state.isRequesting = false
}
