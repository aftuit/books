import styled from "styled-components";

export const Nav = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
`;

export const Paper = styled.div`
  margin-left: 35px;
  width: 330px;
  display: flex;
  transition: all .1s linear;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 4px;
  &:hover {
    background: #fff;
    color: #000;
  }
`;

export const Profile = styled.div`
  margin-left: auto;
  display: flex;
  gap: 10px;
  align-items: center;
`;
