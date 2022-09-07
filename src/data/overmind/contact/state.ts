export const state = {
  detailData: null,
  unfilteredDataContact: [],
  dataContact: {
    tableHead: ["First name", "Last Name", "Phone Number", "Created at"],
    tableBody: [],
    tablePaging: {
      page: 1, //current
      totalPage: 1,
    },
  },
  dataFaveContact: {
    tableHead: ["First name", "Last Name", "Phone Number", "Created at"],
    tableBody: [],
    tablePaging: {
      page: 1, //current
      totalPage: 1,
    },
  },
}
