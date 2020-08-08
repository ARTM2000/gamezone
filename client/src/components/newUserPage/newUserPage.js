import React from "react";

import StyleSheet from "./newUserPage.module.css";
import Wrapper from "../UI/wrapper/wrapper";
import Input from "../UI/input/input";
import Button from "../UI/button/button";
import MiniLoading from "../UI/miniLoading/miniLoading";

const newUserPage = (props) => {
  return (
    <Wrapper>
      <div className={StyleSheet.container}>
        <h2>Create account and enjoy games</h2>
        <Input
          type="text"
          placeholder="Username"
          value={props.username}
          onChange={props.setUsernameFunction}
          autoFocus={true}
          error={props.errors.username}
        />
        <Input
          type="text"
          placeholder="Email"
          value={props.email}
          onChange={props.setEmailFunction}
          error={props.errors.email}
        />
        <Input
          type="password"
          placeholder="Password"
          value={props.pass}
          onChange={props.setPassFunction}
          error={props.errors.pass}
        />
        {props.serverErrors.length > 0
          ? props.serverErrors.map((el, index) => (
              <p key={index} className={StyleSheet.error}>
                {el}
              </p>
            ))
          : null}
        <div className={StyleSheet.controller}>
          <Button
            mode="imp"
            width="47.1%"
            onClick={props.loading ? () => {} : props.createUserFunction}
          >
            {props.loading ? <MiniLoading /> : "Create account"}
          </Button>
          <Button
            width="47.1%"
            onClick={() => props.changeModeFunction("login")}
          >
            Have an account?
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default newUserPage;