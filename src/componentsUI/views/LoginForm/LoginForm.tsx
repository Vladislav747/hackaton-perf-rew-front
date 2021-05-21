import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col } from "react-flexbox-grid";

import Block from "../../../UIKit/atoms/Block";
import Spinner from "../../../UIKit/atoms/Spinner";
import Input from "../../../UIKit/atoms/Input";
import Header from "../Header";

import { ReactComponent as SingInIcon } from "../../../assets/svgs/solid/sign-in-alt.svg";

import {
  Wrapper,
  FormContainer,
  FormWrapper,
  GroupContainer,
  HeadingStyled,
  IconButtonStyled,
} from "./styled-components";

const LoginForm = (props: LoginFormProps) => {
  const {
    handleSubmit: handleSubmitProps,
    errorMsg: errorMsgProps = "",
    authInProgress: authInProgressProps = false,
    location: locationProps = {},
    frontendIsReady: frontendIsReadyProps = false,
  } = props;

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { state = {}, pathname } = locationProps;
  const { from = {} } = state;
  const { pathname: prevPathName } = from;

  const passwordInputRef = useRef<HTMLDivElement>(null);
  const loginInputRef = useRef<HTMLDivElement>(null);

  /**
   * Обработка поле логин
   * @param {*} event - событие
   */
  const handleUsername = (event: any) => {
    const passwordInput = document.getElementById("password");
    // код 13 это enter
    if (event.keyCode === 13) {
      event.preventDefault();
      //@ts-ignore
      passwordInputRef.current.focus();
    }
  };

  /**
   * Обработка поле пароль
   * @param {*} event - событие
   */
  const handlePassword = (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSubmitProps({
        username,
        password,
      });
    }
  };

  /**
   * Обработка нажатия клавиш в форме
   */
  useEffect(() => {
    if (loginInputRef && loginInputRef.current) {
      loginInputRef.current.addEventListener("keyup", handleUsername);
    }
    if (passwordInputRef && passwordInputRef.current) {
      passwordInputRef.current.addEventListener("keyup", handlePassword);
    }
    return () => {
      if (loginInputRef && loginInputRef.current) {
        loginInputRef.current.removeEventListener("keyup", handleUsername);
      }
      if (passwordInputRef && passwordInputRef.current) {
        passwordInputRef.current.removeEventListener("keyup", handlePassword);
      }
    };
  }, [username, password]);

  if (frontendIsReadyProps) {
    return (
      <Redirect
        to={{
          //@ts-ignore
          pathname: prevPathName === pathname ? "/" : prevPathName,
          state: {
            from: locationProps,
          },
        }}
      />
    );
  } else {
    return (
      <>
        <Header showLoginLink={false} />
        {/*@ts-ignore*/}
        <Wrapper className="login__wrapper" center="xs" fluid>
          <FormWrapper className="login__form-wrapper" center="xs">
            <FormContainer
              className="login__form-container"
              xs={12}
              sm={9}
              md={7}
              lg={5}
            >
              <Row className="login__form-row" center="xs">
                <Col className="login__form-col" xs={10}>
                  <GroupContainer
                    className="login__group-container"
                    start="lg"
                    center="sm"
                  >
                    <Col className="login__form-col" xs={12}>
                      <HeadingStyled className="login__heading">
                        Авторизация
                      </HeadingStyled>
                    </Col>
                  </GroupContainer>
                  <GroupContainer
                    className="login__group-container"
                    start="lg"
                    center="sm"
                  >
                    <Col className="group-container__col" xs={12}>
                      <Input
                        /*@ts-ignore*/
                        id="username"
                        className="group-container__input-username"
                        type="text"
                        ref={loginInputRef}
                        title="Логин"
                        label="Логин"
                        value={username}
                        /*@ts-ignore*/
                        onChange={e => setUserName(e.target.value)}
                        autoFocus
                        autocomplete="username"
                      />
                    </Col>
                  </GroupContainer>
                  <GroupContainer
                    className="login__group-container"
                    start="lg"
                    center="sm"
                  >
                    <Col className="group-container__col" xs={12}>
                      <Input
                        /*@ts-ignore*/
                        id="password"
                        className="group-container__input-password"
                        type="password"
                        ref={passwordInputRef}
                        title="Пароль"
                        label="Пароль"
                        value={password}
                        /*@ts-ignore*/
                        onChange={e => setPassword(e.target.value)}
                        autocomplete="current-password"
                      />
                    </Col>
                  </GroupContainer>
                  <GroupContainer
                    className="login__group-container"
                    center="sm"
                  >
                    <Col
                      className="group-container__col"
                      xs={12}
                      sm={9}
                      md={7}
                      lg={5}
                    >
                      <div
                        className="group-container__icon-btn"
                        title="Вход"
                       
                        onClick={() => {
                          handleSubmitProps({
                            username,
                            password,
                          });
                        }}
                      >
                        Вход
                      </div>
                    </Col>
                  </GroupContainer>
                  <GroupContainer
                    className="login__group-container"
                    center="lg"
                  >
                    <Col className="group-container__col" xs={12}>
                      {errorMsgProps &&
                        errorMsgProps.length > 0 &&
                        !authInProgressProps && (
                          /*@ts-ignore*/
                          <Block palette="danger">{errorMsgProps}</Block>
                        )}
                      {authInProgressProps && <Spinner />}
                    </Col>
                  </GroupContainer>
                </Col>
              </Row>
            </FormContainer>
          </FormWrapper>
        </Wrapper>
      </>
    );
  }
};

LoginForm.displayName = "LoginForm";
export default LoginForm;
