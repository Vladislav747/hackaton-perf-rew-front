import styled from "styled-components";

export const BreadcrumbsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 1.13em;
  line-height: 21 px;
  @media (max-width: 575px) {
    flex-direction: row;
    flex-wrap: nowrap;
  }
`;

export const BreadCrumbsInner = styled.div`
  display: inline-flex;
  border: 1px solid #6179b2;
  border-radius: 100px;
  box-shadow: 0px 5px 15px rgba(57, 57, 58, 0.15);
  & a {
    text-decoration: none;
    color: #6179b2;
    border-right: 1px solid #6179b2;
    &:last-child {
      border-right: none;
    }
  }
`;

export const BreadcrumbsItem = styled.div`
  padding: 15px 41px;
  background: #ffffff;
  cursor: pointer;

  &.start {
    border-radius: 100px 0 0 100px;
  }
  &.end {
    border-radius: 0 100px 100px 0;
  }
  &.active {
    background: #2c66be;
    color: #ffffff;
    font-weight: bold;
    & a {
      color: #fff;
    }
    &:hover {
      background: #2c66be;
    }
  }
  cursor: pointer;
  &:hover {
    background: #2c66be;
    color: #fff;
    font-weight: bold;
  }
`;
