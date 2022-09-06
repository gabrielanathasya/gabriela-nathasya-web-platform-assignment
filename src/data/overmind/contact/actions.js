export const getContactList = ({ state, effects }, params) => {
  state.isRequesting = true

  const { searchTerm, page, size } = params

  // dummy data
  const data = [
    {
      created_at: "2022-07-07T02:05:00.297099+00:00",
      first_name: "John",
      id: 5,
      last_name: "Doe",
      phones: [
        {
          number: "+629292929223",
        },
      ],
    },
    {
      created_at: "2022-07-07T02:23:19.244063+00:00",
      first_name: "John2",
      id: 6,
      last_name: "Doe2",
      phones: [
        {
          number: "+629292929223744",
        },
        {
          number: "+62929292922344",
        },
      ],
    },
    {
      created_at: "2022-09-01T13:06:19.806852+00:00",
      first_name: "John4",
      id: 1070,
      last_name: "Doe4",
      phones: [
        {
          number: "+62929292922374ds10",
        },
        {
          number: "+62929292922dsd3454",
        },
      ],
    },
    {
      created_at: "2022-07-07T11:21:14.031501+00:00",
      first_name: "John2",
      id: 11,
      last_name: "Doe2",
      phones: [
        {
          number: "+62929292922374ds4",
        },
        {
          number: "+62929292922dsd344",
        },
      ],
    },
    {
      created_at: "2022-07-06T09:42:45.650552+00:00",
      first_name: "John",
      id: 3,
      last_name: "Suhanda3",
      phones: [
        {
          number: "+12344534344",
        },
        {
          number: "+627181717171",
        },
        {
          number: "+628282726252",
        },
        {
          number: "+123445343445",
        },
        {
          number: "+62828272625244",
        },
        {
          number: "+8282728272828",
        },
      ],
    },
    {
      created_at: "2022-09-03T20:31:22.67561+00:00",
      first_name: "Ace",
      id: 1074,
      last_name: "Portgas",
      phones: [
        {
          number: "+621234567899",
        },
        {
          number: "+629876543211",
        },
      ],
    },
    {
      created_at: "2022-09-03T22:22:36.443821+00:00",
      first_name: "Ace",
      id: 1075,
      last_name: "Portgas",
      phones: [
        {
          number: "+62888888888888",
        },
      ],
    },
    {
      created_at: "2022-09-04T10:51:33.291932+00:00",
      first_name: "John2",
      id: 1077,
      last_name: "Doe2",
      phones: [
        {
          number: "+62123124128191287",
        },
        {
          number: "+6219273757191918",
        },
      ],
    },
    {
      created_at: "2022-06-29T09:25:20.80345+00:00",
      first_name: "Wade",
      id: 2,
      last_name: "Wilson",
      phones: [
        {
          number: "+232323232",
        },
        {
          number: "+62811818181818",
        },
      ],
    },
  ]

  state.contact.dataContact.tablePaging.page = page
  state.contact.dataContact.tablePaging.totalPage = Math.ceil(
    data?.length / size
  )
  state.contact.dataContact.tableBody = data?.map((data) => ({
    id: data?.id,
    rowData: [
      data?.first_name,
      data?.last_name,
      data?.phones,
      data?.created_at,
    ],
  }))
  // await effects.cv.services
  //   .getCVs(params)
  //   .then((res) => {
  //     const processedData = res.data?.map((data) => {
  //       return {
  //         id: data?.cv_id,
  //         startDate: parseInt(data?.start_date) || null,
  //         endDate: parseInt(data?.end_date) || null,
  //         jobTitle: data?.job_title,
  //         jobDescription: data?.job_description,
  //         companyLogoURL: data?.company_logo,
  //         company: data?.company,
  //       }
  //     })
  //     state.cv.cvs = processedData
  //   })
  //   .catch((error) => {
  //     console.error("[FAIL GET DATA]", error)
  //     alert("Get Work Experiences Failed")
  //   })
  state.isRequesting = false
}

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
