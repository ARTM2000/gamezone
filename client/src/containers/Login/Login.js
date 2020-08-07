import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import actionType from "../../Store/actions/basic";

import LoginPage from "../../components/loginPage/loginPage";

class Login extends Component {
  state = {
    email: "",
    pass: "",
    loading: false,
    mode: "login",
  };

  onUserLogin = () => {
    const email = this.state.email;
    const pass = this.state.pass;
    // console.log(email, pass)
    if (email !== "" && pass !== "") {
      this.setState({ loading: true });
      axios
        .post("/v1/auth/login", {
          email,
          pass,
        })
        .then((res) => res.data)
        .then((data) => {
          // console.log(data);
          this.props.onSetValidToken(data.valid);
          if (data.valid) {
            const { id, username, email, token } = data;
            this.props.onSetUser(id, username, email);
            localStorage.setItem("token", token);
            this.setState({ email: "", pass: "" });
          }
          this.setState({ loading: false });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ loading: false });
        });
    }
  };

  render() {
    return (
      <>
        {this.state.mode === "login" ? (
          <LoginPage
            userLoginFunction={this.onUserLogin}
            setEmailFunction={(e) => this.setState({ email: e.target.value })}
            setPassFunction={(e) => this.setState({ pass: e.target.value })}
            email={this.state.email}
            pass={this.state.pass}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onSetUser: (userId, username, email) =>
    dispatch({
      type: actionType.SET_USER,
      userId: userId,
      username: username,
      email: email,
    }),
  onSetValidToken: (value) =>
    dispatch({ type: actionType.SET_VALID_TOKEN, value: value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
