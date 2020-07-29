import React from "react";

import StyleSheet from "./doozGameDisplay.module.css";

const userAct = (
  <div className={StyleSheet.cross}>
    <span className={StyleSheet.cross1}></span>
    <span className={StyleSheet.cross2}></span>
  </div>
);

const otherAct = <div className={StyleSheet.circle}></div>;

const doozGameDisplay = (props) => {
  return (
    <>
      {props.result.value ? (
        props.result.mode === "user" ? (
          <h2>You win</h2>
        ) : props.result.mode === "other" ? (
          <h2>You lose :(</h2>
        ) : null
      ) : null}
      <div className={StyleSheet.playGround}>
        <span className={StyleSheet.divider1}></span>
        <span className={StyleSheet.divider2}></span>
        <span className={StyleSheet.divider3}></span>
        <span className={StyleSheet.divider4}></span>
        <table>
          <tbody>
            {props.cells.map((row, RIndex) => {
              return (
                <tr key={RIndex}>
                  {row.map((cell, index) => {
                    return (
                      <td
                        key={index}
                        onClick={() => props.onSendActFunction(RIndex, index)}
                      >
                        <div className={StyleSheet.cell}>
                          {cell.action
                            ? cell.mode === "user"
                              ? userAct
                              : cell.mode === "other"
                              ? otherAct
                              : null
                            : null}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default doozGameDisplay;
