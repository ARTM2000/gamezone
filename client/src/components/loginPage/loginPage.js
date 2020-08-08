import React from "react";

import StyleSheet from "./loginPage.module.css";
import Wrapper from "../UI/wrapper/wrapper";
import Input from "../UI/input/input";
import Button from "../UI/button/button";
import MiniLoading from "../UI/miniLoading/miniLoading";

const loginPage = (props) => {
  return (
    <Wrapper>
      <div className={StyleSheet.container}>
        <h2>Welcome to GameZone</h2>
        <Input
          type="text"
          placeholder="Email"
          value={props.email}
          onChange={props.setEmailFunction}
          autoFocus={true}
          error={props.errors.email}
        />
        <Input
          type="password"
          placeholder="Password"
          value={props.pass}
          onChange={props.setPassFunction}
          error={props.errors.pass}
        />
        <div className={StyleSheet.controller}>
          <Button mode="imp" width="47.1%" onClick={props.userLoginFunction}>
            {props.loading ? <MiniLoading /> : "Sign in"}
          </Button>
          <Button width="47.1%" onClick={() => props.changeModeFunction("newUser")}>Sign up</Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default loginPage;
