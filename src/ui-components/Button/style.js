import styled from "styled-components"
import Button from '@mui/material/Button';

const ButtonEl = styled(Button)`
    background-color: ({(bg) => bg? bg: '#6200EE'}) !important;
    margin-top: ({(mt) => mt});
    border-color: ({(border) => border});
    width: 100%;
`
export default ButtonEl