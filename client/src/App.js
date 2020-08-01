import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import socket from "./socket.config";

import Layout from "./components/layout/layout";
import DoozGame from "./containers/DoozGame/DoozGame";
import Login from "./containers/Login/Login";
import "./App.css";

import actionTypes from "./Store/actions/basic";

class App extends Component {
  state = {

  };

  componentDidMount() {
    // console.log("socket: ", socket)
    console.log("socket set")
    socket.on("hi", data => {
      console.log(data.msg)
    })
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/dooz" component={DoozGame} />
          <Route exact path="/" component={Login} />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  // socket: state.socket
})

const mapDispatchToProps = dispatch => ({
  // setSocket: (socket) => dispatch({type: actionTypes.SET_SOCKET, socket: socket})
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
