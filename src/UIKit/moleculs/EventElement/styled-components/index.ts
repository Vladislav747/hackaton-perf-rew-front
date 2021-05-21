import styled from "styled-components";

export const EventElementWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  padding-left: 10px;
  cursor: pointer;
  align-items: start;
  justify-content: center;
`;

export const EventImgContainer = styled.div`
  position: relative;
  flex: 1 1 auto;
  height: 50px;
  width: 70px;
  max-height: 50px;
  max-width: 70px;
  border-radius: 10px 10px 10px 10px;
  overflow: hidden;
`;

export const EventImg = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
`;

export const EventDataContainer = styled.div`
  flex: 1 0 auto;
  padding-left: 10px;
  justify-content: left;
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  white-space: nowrap;
`;

export const MetaDataList = styled.ul`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
`;
