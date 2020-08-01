import React from "react";

import StyleSheet from "./loginPage.module.css";
import Wrapper from "../UI/wrapper/wrapper";
import Input from "../UI/input/input";
import Button from "../UI/button/button";

const loginPage = (props) => {
  return (
    <Wrapper>
      <div className={StyleSheet.container}>
      <h2>Welcome to GameZone</h2>
        <Input type="text" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <div className={StyleSheet.controller}>
          <Button mode="imp" width="47.1%">
            Sign in
          </Button>
          <Button width="47.1%">Sign up</Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default loginPage;
