import React from "react";

import StyleSheet from "./button.module.css";

const button = (props) => {

    let mode;
    //managing button style base on its priority
    switch(props.mode) {
        case "imp":
            mode = StyleSheet.impButton
            break;
        case "low":
            mode = StyleSheet.lowButton;
            break;
        default:
            mode = StyleSheet.button
    }

    return (
      <button
        className={mode}
        onClick={props.onClick}
        style={{ width: props.width ? props.width : "90%" }}
      >
        {props.children}
      </button>
    );
}

export default button;
