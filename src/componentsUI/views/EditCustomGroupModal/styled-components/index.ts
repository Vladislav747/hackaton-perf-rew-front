import styled from "styled-components";
// @ts-ignore-start
import { palette } from "styled-theme";

import Button from "../../../../UIKit/atoms/Button";

export const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 15vh;
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

export const InputStyled = styled.input<InputStyledProps>`
  position: relative;
  height: calc(1.5em + 0.5rem + 2px);
  width: 100%;
  padding: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid ${palette("grayscale", 3)};
  &:active,
  :focus {
    border: 1px solid ${palette("primary", 4)};
    box-shadow: 0 0 0 1px ${palette("primary", 4)};
  }
`;

export const ModalInnnerBody = styled.div`
  padding: 10px 30px;
  text-align: center;
`;

export const ModalFooter = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: flex-end;
`;

//Console.log сделать background на palette
export const StyledButton = styled(Button)`
  border-radius: 4px;
  box-shadow: unset;
  padding: 0 1.5em;
  background-color: #2C66BE;
  color: #fff;
`;

