export const setContactList = ({ state }: any, { data, faveIds }: any) => {
  const { contact } = data
  const isHaveFaveIds = faveIds?.length > 0
  console.log({ isHaveFaveIds, faveIds })
  state.contact.dataContact.tableBody = contact?.map((item: any) => {
    if ((isHaveFaveIds && !faveIds?.includes(item?.id)) || !isHaveFaveIds) {
      const phones = item.phones?.map((phone: any) => phone.number)
      return {
        id: item?.id,
        rowData: [item?.first_name, item?.last_name, phones, item?.created_at],
      }
    }
  })

  if (isHaveFaveIds) {
    state.contact.dataFaveContact.tableBody = contact?.map((item: any) => {
      if (faveIds?.includes(item?.id)) {
        const phones = item.phones?.map((phone: any) => phone.number)
        return {
          id: item?.id,
          rowData: [
            item?.first_name,
            item?.last_name,
            phones,
            item?.created_at,
          ],
        }
      }
    })
    state.contact.dataFaveContact.tablePaging.totalPage = faveIds?.length || 1
  }
}
