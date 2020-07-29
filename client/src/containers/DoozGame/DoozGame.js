import React, { Component } from "react";
import { connect } from "react-redux";

import socket from "../../socket.config";

import DoozGameDisplay from "../../components/doozGameDisplay/doozGameDisplay";

class DoozGame extends Component {
  state = {
    cells: [
      [{}, {}, {}],
      [{}, {}, {}],
      [{}, {}, {}],
    ],
    result: {},
    allowAct: null,
  };

  componentDidMount() {
    socket.emit("joinDooz", {});
    socket.on("DoozTurn", (data) => {
      this.setState({ allowAct: data.allow });
    });

    socket.on("receiveActDooz", (data) => {
      const { row, cell } = data;
      this.onReceiveAct(row, cell);
    });
  }

  onReceiveAct = (row, cell) => {
    const cells = [...this.state.cells];
    const actCell = cells[row][cell];
    actCell.action = true;
    actCell.mode = "other";
    this.setState({ cells }, () => {
      this.onCheckTheGame();
      this.setState((prevState) => ({ allowAct: !prevState.allowAct }));
    });
  };

  onSendAct = (row, cell) => {
    const cells = [...this.state.cells];
    const actCell = cells[row][cell];

    if (actCell.action === undefined && socket && this.state.allowAct) {
      socket.emit("sendActDooz", { row, cell });
      actCell.action = true;
      actCell.mode = "user";
      this.setState({ cells }, () => {
        this.onCheckTheGame();
        this.setState((prevState) => ({ allowAct: !prevState.allowAct }));
      });
    }
  };

  onCheckTheGame = () => {
    const checkModel = (m1, m2, m3) => {
      if (m1 && m2 && m3) {
        if (m1 === m2 && m1 === m3 && m2 === m3) {
          return {
            mode: m1,
            value: true,
          };
        }
      }
      return false;
    };
    /* 
        0: 0, 1, 2
        1: 0, 1, 2
        2: 0, 1, 2
    */
    const cells = [...this.state.cells];
    let result = false;

    for (let i = 0; i < 3 && !result; i++) {
      result = checkModel(cells[0][i].mode, cells[1][i].mode, cells[2][i].mode);
    }

    for (let i = 0; i < 3 && !result; i++) {
      result = checkModel(cells[i][0].mode, cells[i][1].mode, cells[i][2].mode);
    }

    if (!result) {
      result = checkModel(cells[0][0].mode, cells[1][1].mode, cells[2][2].mode);
    }
    if (!result) {
      result = checkModel(cells[0][2].mode, cells[1][1].mode, cells[2][0].mode);
    }

    if (result) {
      this.setState({
        result,
      });
      setTimeout(
        () =>
          this.setState({
            cells: [
              [{}, {}, {}],
              [{}, {}, {}],
              [{}, {}, {}],
            ],
            result: {},
          }),
        5000
      );
    }
  };

  render() {
    return (
      <>
        <DoozGameDisplay
          onSendActFunction={this.onSendAct}
          cells={this.state.cells}
          result={this.state.result}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  socket: state.socket,
});

export default connect(mapStateToProps)(DoozGame);
