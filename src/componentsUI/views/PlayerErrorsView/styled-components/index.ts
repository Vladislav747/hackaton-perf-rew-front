import styled, { keyframes } from "styled-components";

export const PlayerErrorsViewContainer = styled.div`
  position: absolute;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  font-weight: 400;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  z-index: 10;
`;

const fadeIn = keyframes`
  0% {  opacity: 0; }
  100% { opacity: 1; }
`;

export const StreamErrorMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  flex-direction: column;
  text-align: center;
  background: rgb(44, 102, 190);
  color: #fff;
  font-weight: 400;
  font-size: 1.5rem;
  width: 100%;
  height: 100%;
  background: rgb(44, 102, 190);
  animation: ${fadeIn} 250ms;
`;

export const FallbackImage = styled.img`
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
`;
