import styled from "styled-components";
// import { ReactComponent as google } from "../../assets/icons/google.svg";
// import { ReactComponent as facebook } from "../../assets/icons/facebook.svg";

export const Box = styled.div`
  padding: 30px 65px;
  background: #fff;
  /* border: 1px solid gray; */
  border-radius: 12px;
  width: fit-content;
  display: block;

  box-shadow: 0px 4px 32px 0px rgba(51, 51, 51, 0.15);


`;
export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  line-height: 45px;
  letter-spacing: 0em;
  text-align: center;
  color: #151515;
`;
export const Content = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  gap: ${({gap}) => gap? gap: '10px'};
`;
export const Img = styled.img`
  margin-right: 10px;
`;

export const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #24272C;
`
export const Span = styled.div`
  padding: 0 24px;
  display: flex;
  justify-content: center;
  background-color: #fff;
`
export const Text = styled.div`
  /* margin-top: 10px; */
  font-size: 14px;
  font-weight: 300;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  color: #333333;
`


// export const Icons = styled.div``;
// Icons.Google = styled(google)``;
// Icons.Facebook = styled(facebook)``;
