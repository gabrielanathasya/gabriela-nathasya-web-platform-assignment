export const state = {
  detailData: null,
  dataContact: {
    tableHead: ["First name", "Last Name", "Phone Number", "Created at"],
    tableBody: [
      {
        id: 1,
        rowData: [
          "John",
          "Doe",
          ["+629292929223", "+62123123123"],
          "2022-07-07T02:05:00.297099+00:00",
        ],
      },
    ],
    tablePaging: {
      page: 1, //current
      totalPage: 1,
    },
  },
}
