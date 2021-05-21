import styled, { keyframes } from "styled-components";

export const SuccessImg = styled.img<any>`
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  border-radius: 0px 0px 4px 4px;
`;

export const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const loadind = keyframes`
    100% {
        transform: translateX(100%);
    }
`;

export const FailedLoadImgContainer = styled.img`
height: 100%;
width: 100%;
max-width: 100%;
max-height: 100%;
`

export const Sceleton = styled.figure`
  position: relative;
  background-color: #e2e2e2;

  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
  border-radius: 0px 0px 10px 10px;
  display: block;

  &::after {
    display: block;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(162, 159, 159, 0.2),
      transparent
    );
    animation: ${loadind} 1.5s infinite;
  }
`;

export const LoadingImgContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 100%;
  width: 100%;
  border-radius: 0px 0px 4px 4px;
`;
