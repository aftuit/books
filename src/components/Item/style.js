import styled from "styled-components";
import { Button } from "@mui/material";

export const CardWrap = styled.div`
  position: relative;
`;
export const Icons = styled.div`
  position: absolute !important;
  right: -25px;
  top: 10%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const IconEdit = styled(Button)`
  background: #6201ec !important;
  min-width: 32px !important;
  min-height: 32px !important;
  padding: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const IconDelete = styled(Button)`
  background: #f84c4e !important;
  min-width: 32px !important;
  min-height: 32px !important;
  padding: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Flex = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;