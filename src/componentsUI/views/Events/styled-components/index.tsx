import { List } from "react-virtualized";
import styled from "styled-components";

export const EventsElementsBoxContainer = styled.div`
  position: absolute;
  display: flex;
  flex: 1 1 auto;
  overflow: auto;
  flex-direction: column;
  background-color: #333333;
  border-radius: 10px;

  min-height: 100%;
  max-height: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 100%;
  width: 100%;
`;

export const EventsBodyContent = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  color: white;

  overflow-x: hidden;
  overflow-y: auto;
  @media (max-width: 960px) {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  }
`;

export const EventsHeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 10px;
  color: white;

  font-size: 1.5rem;
  font-weight: bold;
`;

export const StyledEventsList = styled(List)`
  &:focus {
    outline: none;
  }
`;
