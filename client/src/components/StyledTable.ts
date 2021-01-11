import { TableCell, TableRow } from "@material-ui/core";
import styled from "styled-components";

export const StyledTableCell = styled(TableCell)`
  &.MuiTableCell-head {
    color: white;
    background: #2c94e2;
    font-weight: 700;
  }
`;

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
