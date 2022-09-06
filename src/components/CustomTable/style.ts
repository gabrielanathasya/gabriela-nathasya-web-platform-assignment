import styled from "@emotion/styled"

export const Wrapper = styled.div`
  .cellDesktop,
  .cell {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .cellHeader {
    word-wrap: break-word;
  }

  .cellDesktop {
    max-width: 140px;
    margin: 16px 0;
  }

  thead {
    border-top: solid 2px #dee2e6;
  }

  .detail-button {
    margin-left: 10px;
    cursor: pointer;
  }

  .detail-button:hover {
    opacity: 0.5;
  }
`
