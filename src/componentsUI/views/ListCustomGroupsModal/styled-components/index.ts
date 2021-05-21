import styled from "styled-components";
// @ts-ignore-start
import { palette } from "styled-theme";
import Checkbox from "rc-checkbox";

export const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 26vh;
  background-color: ${palette("grayscale", 0, true)};
  max-width: 90vw;
  width: 400px;
  @media (max-width: 575px) {
    width: 320px;
    height: 70vh;
  }

  &&& {
    box-sizing: border-box;
  }
`;

export const HeaderContainer = styled.div`
  width: calc(100% - 2em);
  padding: 0 1em;
  text-align: center;
  font-weight: 600;
`;

export const ModalInnnerBody = styled.div`
  padding: 10px;
  text-align: center;
  overflow: auto;
`;

export const ModalInnerFooter = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CheckboxStyled = styled(Checkbox)`
  padding: 0 1em;
`;

export const Container = styled.div`
  width: 100%;
  transition: background-color 0.5 ease-in;
  box-sizing: border-box;
  border-top: 1px solid #808080;
  border-bottom: 1px solid #808080;
  &:hover {
    background-color: ${palette("grayscale", 6)};
  }
`;

export const Wrapper = styled.div`
  cursor: pointer;
  padding: 1em 0 1em 1.2em;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const IconContainer = styled.div`
  cursor: pointer;
  width: 1.2em;
  height: 1.2em;
  & svg {
    width: 1.2em;
    height: 1.2em;
    fill: ${palette("grayscale", 2)};
    stroke: none;
  }
`;

export const StyledButton = styled.button`
  border: none;
  margin: 0.5em auto;
  appearance: none;
  text-decoration: none;
  font-weight: 400;
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  display: inline-block;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  color: rgb(255, 255, 255);
  background: rgb(41, 148, 0);
  padding: 0.5em;
  display: flex;
`;
