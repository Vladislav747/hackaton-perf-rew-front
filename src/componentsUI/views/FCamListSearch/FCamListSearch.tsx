import React, { useRef, useEffect } from "react";
import { debounce } from "lodash";

import { ReactComponent as SearchIcon } from "../../../assets/svgs/solid/search.svg";
import { ReactComponent as ClearIcon } from "../../../assets/svgs/solid/times.svg";

import {
  Container,
  IconContainer,
  InputStyled,
  ClearIconContainer,
} from "./styled-components";

const FCamListSearch = ({
  searchString: searchStringProps,
  changeSearchString: changeSearchStringProps,
}: FCamListSearchProps) => {
  //Ссылка на input
  const inputEl = useRef<HTMLInputElement>(null!);
  /**
   * Обработчик ввода текста для запуска поиска
   */
  const handleChangeSearchString = debounce(string => {
    changeSearchStringProps(string);
  }, 500);

  /**
   * Очистить input поиска
   */
  const clearInput = () => {
    if (inputEl && inputEl.current) {
      inputEl.current.value = "";
    }
    changeSearchStringProps("");
  };

  //Если очистили значение props на всякий случай очищаем значение в input
  useEffect(() => {
    if (searchStringProps === "") inputEl.current.value = "";
  }, [searchStringProps]);

  return (
    <Container className="cameras-list__search search-container">
      <InputStyled
        className="search-container__input"
        ref={inputEl}
        type="text"
        aria-label="search"
        placeholder="Поиск по названию камеры"
        defaultValue={searchStringProps}
        onChange={e => handleChangeSearchString(e.target.value)}
      />
      {searchStringProps == "" && (
        <IconContainer className="search-container__search-icon-container">
          <SearchIcon className="search-container__search-icon" />
        </IconContainer>
      )}

      {searchStringProps !== "" && (
        <ClearIconContainer
          className="search-container__clear-icon-container"
          onClick={clearInput}
        >
          <ClearIcon className="search-container__clear-icon" />
        </ClearIconContainer>
      )}
    </Container>
  );
};

FCamListSearch.displayName = "FCamListSearch";
export default FCamListSearch;
