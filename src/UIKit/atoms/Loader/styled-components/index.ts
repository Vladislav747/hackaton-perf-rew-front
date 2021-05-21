import styled, { keyframes } from "styled-components";

const LdsDualRingAnimation = keyframes`
0% {
	transform: rotate(0deg);
  }
  100% {
	transform: rotate(360deg);
  }
`;

export const LdsDualRing = styled.div<LdsDualRingType>`
  width: 64px;
  height: 64px;
  margin: ${props => props.marginProp};
  &:after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid ${props => props.loaderColor};
    border-color: ${props => props.loaderColor} transparent ${props => props.loaderColor} transparent;
    animation: ${LdsDualRingAnimation} 2.5s linear infinite;
  }
`;

export const LoaderWrapper = styled.div`
  margin: auto;
  }
`;
