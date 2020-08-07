import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import socket from "./socket.config";

import Layout from "./components/layout/layout";
import DoozGame from "./containers/DoozGame/DoozGame";
import Login from "./containers/Login/Login";
import "./App.css";

import actionType from "./Store/actions/basic";

class App extends Component {
  state = {
    
  };

  componentDidMount() {
    this.setState({ validToken: this.props.validToken });
    const token = localStorage.getItem("token");
    axios
      .post("/v1/auth/verify", {
        token,
      })
      .then((res) => res.data)
      .then((data) => {
        console.log("on check");
        this.props.setValidToken(data.valid);
        // console.log(this.props.validToken);
        if (data.valid) {
          this.props.onSetUser(data.id, data.username, data.email)
        }
      })
      .catch((err) => console.log(err));

    console.log("socket set");
    socket.on("hi", (data) => {
      console.log(data.msg);
    });
  }

  render() {
    return (
      <Layout>
        <Switch>
          {!this.props.validToken || this.props.validToken === null ? (
            <>
            {/* in case that user did not authenticated */}
              <Redirect to="/auth" />
              <Route exact path="/auth" component={Login} />
            </>
          ) : (
            <>
            {/* in case that user authenticated */}
              <Redirect to="/dashboard"/>
              <Route exact path="/dooz" component={DoozGame} />
            </>
          )}
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  validToken: state.validToken,
});

const mapDispatchToProps = (dispatch) => ({
  setValidToken: (value) =>
    dispatch({ type: actionType.SET_VALID_TOKEN, value: value }),
  onSetUser: (userId, username, email) =>
    dispatch({
      type: actionType.SET_USER,
      userId: userId,
      username: username,
      email: email,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
