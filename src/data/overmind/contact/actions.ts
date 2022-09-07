export const setContactList = ({ state }: any, { data, totalData }: any) => {
  const { contact } = data
  // state.contact.unfilteredDataContact = []
  state.contact.unfilteredDataContact = totalData?.contact?.map(
    (item: any) => ({ firstName: item?.first_name, lastName: item?.last_name })
  )
  state.contact.dataContact.tableBody = contact?.map((item: any) => {
    const phones = item.phones?.map((phone: any) => phone.number)
    return {
      id: item?.id,
      rowData: [item?.first_name, item?.last_name, phones, item?.created_at],
    }
  })
}

export const setFaveContactList = ({ state }: any, { data }: any) => {
  const { contact } = data
  state.contact.dataFaveContact.tableBody = contact?.map((item: any) => {
    const phones = item.phones?.map((phone: any) => phone.number)
    return {
      id: item?.id,
      rowData: [item?.first_name, item?.last_name, phones, item?.created_at],
    }
  })
}

export const setDetailData = ({ state }: any, { detailData }: any) => {
  const { contact_by_pk } = detailData

  const phones = contact_by_pk?.phones?.map((phone: any) => {
    if (phone?.number) {
      return phone.number
    }
  })

  state.contact.detailData = {
    ...contact_by_pk,
    phones,
  }
}

export const resetDetailData = ({ state }: any) => {
  state.contact.detailData = null
}
