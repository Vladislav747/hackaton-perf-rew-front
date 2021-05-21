import styled from 'styled-components';

import { ReactComponent as GarbageIcon } from "../../../../assets/img/FCamListItem/garbage.svg";
import { ReactComponent as ThreeDotsVerticalIcon } from "../../../../assets/svgs/streetsOnline/Main/ThreeDotsVerticalIcon.svg";
import { ReactComponent as EditIcon } from "../../../../assets/svgs/streetsOnline/Main/EditIcon.svg";

export const SubMenuElement = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledGarbageIcon = styled(GarbageIcon)`
  cursor: pointer;
  margin-right: 7px;
  &:hover {
    path {
      fill: #ff0505;
    }
  }
`;

export const StyledEditIcon = styled(EditIcon)`
  cursor: pointer;
  margin-right: 7px;
  path {
      fill: rgb(44, 102, 190);
    }
  &:hover {
    path {
      fill: #ff0505;
    }
  }
`;

export const StyledThreeDotsVerticalIcon = styled(ThreeDotsVerticalIcon)`
  cursor: pointer;
  &:hover {
    path {
      fill: #ff0505;
    }
  }
`;

export const SubMenuLink = styled.a`
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  display: block;
  cursor: pointer;
  padding: 8px;
  width: 100%;
  &:hover {
    background: #606875;
  }
  &.active{
    background: #606875;
  }
`;

export const DropDownWrapper = styled.div`
  z-index: 1000;
  position: absolute;
  top: 39px;
  left: 85px;
  visibility: inherit;
  border-radius: 4px;
  background: #fff;
  padding: 1em 1.5em;
  background-color: #fff;
  background-clip: padding-box;
  box-shadow: 0 1px 8px -1px rgb(0 0 0 / 30%);
}
`;


export const DropDownArrow = styled.div`
  top: -5px;
  left: 66%;
  margin-left: -5px;
  -webkit-transform: rotate(
45deg
);
  transform: rotate(
45deg
);
  position: absolute;
  display: inline-block;
  box-sizing: border-box;
  width: 0;
  height: 0;
  border-color: #fff;
  border-style: solid;
  border-width: 0 0 12px 12px;
  box-shadow: -1px -1px 1px 0 rgb(0 0 0 / 10%);
}

`;

export const DropDownContent = styled.div``;

export const DropDownContentInner = styled.div`
    margin: -4px -20px;
    overflow: hidden;
`;

export const DropDownContentItem = styled.button`
    cursor: pointer;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -webkit-align-items: center;
    align-items: center;
    padding: 4px 20px;
    background: #fff;
    transition: background .15s linear;
    color: #000;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    line-height: 25px;
    border: none;
    &:hover{
      background: rgba(91,102,122,.05);
    }
`;

