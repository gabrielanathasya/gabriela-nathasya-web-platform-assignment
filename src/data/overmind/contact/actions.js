export const getDetail = async ({ state, effects }, { id }) => {
  state.isRequesting = true

  await effects.profile.services
    .getDetail({
      id,
    })
    .then((res) => {
      const detail = res.data
      state.profile.detailData = detail ? detail[0] : null
    })
    .catch((error) => {
      console.error("[FAIL GET DETAIL]", error)
      alert("Get Detail Failed")
    })

  state.isRequesting = false
}

export const create = async ({ state, effects }, reqPayload) => {
  state.isRequesting = true

  await effects.profile.services
    .create(reqPayload)
    .then((res) => {
      const data = res.data
      state.profile.userId = data?.length > 0 ? data[0].user_id : null
    })
    .catch((error) => {
      console.error("[FAIL CREATE]", error)
      alert("Insert Failed")
    })

  state.isRequesting = false
}

export const update = async ({ state, effects }, spec) => {
  state.isRequesting = true

  const id = spec.id
  delete spec["id"]

  await effects.profile.services.update({ id, spec }).catch((error) => {
    console.error("[FAIL UPDATE]", error)
    alert("Update Failed")
  })

  state.isRequesting = false
}
