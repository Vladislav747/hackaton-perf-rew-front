import { palette } from "styled-theme";
import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 0 1em;
`;

export const ListContainer = styled.div`
  flex-grow: 1;
  padding-top: 0 1px;
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background: ${palette("grayscale", 2)};
    box-shadow: 0 10px 10px -10px #333;
    margin-bottom: 1px;
    top: 0;
    left: 0;
  }
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background: ${palette("grayscale", 2)};
    box-shadow: 0 10px 10px -10px #333;
    bottom: 0;
    left: 0;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background: ${palette("grayscale", 3)};
    box-shadow: 0 10px 10px -10px #333;
    bottom: 0;
    left: 0;
  }
`;

export const ModalInnerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
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

export const SearchContainer = styled(Wrapper)`
  width: 100%;
  padding: 0 0 1em;
`;

export const HeaderContainer = styled(Wrapper)`
  width: calc(100% - 2em);
`;

export const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
`;
export const SpinnerInner = styled.div`
  margin: auto;
`;

export const ListOpenContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-style: normal;
  font-size: 1em;
  line-height: 1.5em;
  font-weight: 400;
  margin: 10px auto;
`;

export const ListOpenLink = styled.a`
  text-decoration: none;
  color: ${palette("default", 1)};
  &:hover {
    color: #4479c9;
  }
`;

export const IconContainer = styled.div`
  cursor: pointer;
  width: 1.3em;
  height: 1.3em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 8px 0 0;
  & svg {
    fill: ${palette("primary", 2)};
    stroke: none;
  }
`;
