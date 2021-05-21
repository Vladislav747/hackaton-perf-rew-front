import styled from "styled-components";

import { mediaQueries } from "../../../../helpers/styled-components";

import { ReactComponent as HeartIcon } from "../../../../assets/svgs/regular/heart.svg";
import { ReactComponent as FolderIcon } from "../../../../assets/svgs/regular/folder.svg";
import { ReactComponent as SquareIcon } from "../../../../assets/svgs/regular/square.svg";

export const CamsFunctionalListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CameraRow = styled.div`
  flex-wrap: nowrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  ${mediaQueries("md_bootstrap")`
    height: 100%;
    width: 100%;
    flex-wrap: nowrap;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: left;
  `};
`;

export const SmallItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  height: 100%;
  min-height: 50px;
  max-height: 50px;
  width: 100%;
  min-width: 50px;
  max-width: 50px;
  ${mediaQueries("md_bootstrap")`
    display: flex;
    align-items: center;
    justify-content: left;
    height: 50%;
    min-height: 50px;
    max-height: 50px;
    width: 100%;
    min-width: 50px;
    max-width: 50px;
  `};
`;

export const CameraObject = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  height: 100%;
  max-height: 100%;
  width: 49%;
  max-width: 49%;
  min-width: 49%;
  box-sizing: border-box;
  ${mediaQueries("md_bootstrap")`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    height: 50%;
    max-height: 50%;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;

  `};
`;

export const FunctionalMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  width: 20%;
  height: 50%;
  flex-wrap: nowrap;
  justify-content: space-around;
`;

export const TextElement = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;

export const CameraImageInFunctionalList = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0.5em;
`;

export const FunctionalListRowWrapper = styled.div`
  padding-top: 4px;
  padding-bottom: 4px;
  box-sizing: border-box;
`;

export const StyledHeartIcon = styled(HeartIcon)`
  height: 40%;
`;
export const StyledFolderIcon = styled(FolderIcon)`
  height: 40%;
`;
export const StyledSquareIcon = styled(SquareIcon)`
  height: 40%;
`;
