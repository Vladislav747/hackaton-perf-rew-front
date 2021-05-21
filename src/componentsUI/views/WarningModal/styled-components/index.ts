import styled from "styled-components";
// @ts-ignore-start
import { palette } from "styled-theme";
import { mediaQueries } from "../../../../helpers/styled-components";

export const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${palette("grayscale", 0, true)};
  max-width: 90vw;
  width: 450px;

  ${mediaQueries("sm")`
    width: 300px;
  `}

  &&& {
    box-sizing: border-box;
  }
`;

export const HeaderContainer = styled.div`
  width: calc(100% - 2em);
  padding: 0 1em;
  text-align: center;
  font-size: 1.5em;
  font-weight: 600;
`;

export const ModalInnerBody = styled.div`
  padding: 20px 30px;
  flex-grow: 1;
  text-align: center;
  overflow: auto;
`;

export const ModalInnerFooter = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  ${mediaQueries("sm")`
    flex-direction: column;
  `}
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
  color: ${palette("white", 0)};
  background: ${palette("buttonPrimaryColor", 0)};
  padding: 0.5em 2em;
  display: flex;

  &:hover {
    background: ${palette("buttonPrimaryColor", 1)};
  }
`;

export const DisagreedStyledButton = styled(StyledButton)`
  background: ${palette("buttonDangerColor", 0)};

  &:hover {
    background: ${palette("buttonDangerColor", 1)};
  }
`;
