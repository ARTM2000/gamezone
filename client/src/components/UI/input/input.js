import React from "react";

import StyleSheet from "./input.module.css";

const input = (props) => {
  return (
    <>
      <input
        type={props.type}
        className={StyleSheet.input}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown ? props.onKeyDown : () => {}}
        autoFocus={props.autoFocus ? true : false}
      />
      {props.error.length > 0 ? (
        <p className={StyleSheet.error}>{props.error[0].msg}</p>
      ) : null}
    </>
  );
};

export default input;
