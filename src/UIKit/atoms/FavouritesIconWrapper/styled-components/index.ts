import styled from "styled-components";
// @ts-ignore-start
import { ifProp } from "styled-tools";

//@ts-ignore
import { palette } from "styled-theme";

import { ReactComponent as FavouritesIconWithBackground } from "../../../../assets/svgs/streetsOnline/Archive/FavouritesIconWithBackground.svg";
import { ReactComponent as FavouritesFilledIconWithBackground } from "../../../../assets/svgs/streetsOnline/Archive/FavouritesFilledIconWithBackground.svg";

export const FavouritesBtn = styled(FavouritesIconWithBackground)<
  FavouritesBtnStyled
>`
  cursor: pointer;
  z-index: 1;
  opacity: ${ifProp("disabled", "0.5", "1")};
  &:hover {
    & path {
      opacity: 0.8;
    }
  }
`;

export const FavouritesFilledBtn = styled(FavouritesFilledIconWithBackground)`
  cursor: pointer;
  z-index: 1;
`;

export const SpanLink = styled.a`
  cursor: pointer;
  text-align: center;
  color: ${palette("primary", 4)};
  &:hover {
    color: ${palette("primary", 5)};
  }
`;
