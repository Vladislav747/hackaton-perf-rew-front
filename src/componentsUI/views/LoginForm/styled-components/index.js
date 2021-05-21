import styled from "styled-components";
import { Grid, Row, Col } from "react-flexbox-grid";

export const Wrapper = styled(Grid)`
  min-height: 100vh;
  height: 1px;
  overflow: hidden;
`;

export const FormWrapper = styled(Row)`
  min-height: 100%;
`;

export const FormContainer = styled(Col)`
  margin: auto;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #c8ced3;
  border-radius: 0.25rem;
  min-width: 320px;
  padding: 0.5rem;
`;

export const GroupContainer = styled(Row)`
  margin-bottom: 1.2rem;
`;

export const HeadingStyled = styled.div`
  margin-top: 1.2rem;
  margin-bottom: 0;
  text-align: center;
`;

export const IconButtonStyled = styled.div`
  width: 100%;
`;
