import React from "react";

import StyleSheet from "./input.module.css";

const input = (props) => {
  return (
    <input
      type={props.type}
      className={StyleSheet.input}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown ? props.onKeyDown : () => {}}
    />
  );
};

export default input;
