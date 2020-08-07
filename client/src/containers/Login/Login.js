import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import actionType from "../../Store/actions/basic";

import LoginPage from "../../components/loginPage/loginPage";
import NewUserPage from "../../components/newUserPage/newUserPage";

class Login extends Component {
  state = {
    username: "",
    email: "",
    pass: "",
    loading: false,
    mode: "newUser",
    authErrors: {
      email: [],
      pass: [],
      username: [],
    },
  };

  onChangeMode = (mode) => {
    let authMode;
    switch (mode) {
      case "login":
        authMode = "login";
        break;

      case "newUser":
        authMode = "newUser";
        break;

      default:
        authMode = "login";
    }
    this.setState({
      username: "",
      email: "",
      pass: "",
      mode: authMode,
      authErrors: { email: [], pass: [], username: [] },
    });
  };

  inputValidation = (username, email, pass) => {
    let errorsCount = 0;
    const errors = { ...this.state.authErrors };
    const emailPattern = /[a-zA-Z0-9]{2,}@[a-zA-Z]{2,}.[a-z]{2,5}/gi;

    //username validation
    if (username && username.length <= 2) {
      errorsCount++;
      errors.username.push({ msg: `${username.length > 0 ? username: "Username"} is not long enough` });
    }

    //email validation
    if (email !== undefined) {
      const valid = email.match(emailPattern);
      if (!valid) {
        errorsCount++;
        errors.email.push({ msg: "Email is not valid" });
      }
    }

    //password validation
    if (pass.length < 5) {
      errorsCount++;
      errors.pass.push({ msg: "Your password is not long enough" });
    }

    this.setState({ authErrors: errors });
    return errorsCount;
  };

  onUserLogin = () => {
    const email = this.state.email;
    const pass = this.state.pass;
    const hasError = this.inputValidation(undefined, email, pass);

    if (hasError === 0) {
      this.setState({ loading: true });
      axios
        .post("/v1/auth/login", {
          email,
          pass,
        })
        .then((res) => res.data)
        .then((data) => {
          //   console.log(data);
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

  onNewUserCreation = () => {
    const username = this.state.username;
    const email = this.state.email;
    const pass = this.state.pass;
    const hasError = this.inputValidation(username, email, pass)

    if (hasError === 0) {
      console.log("on create");
      axios
        .post("/v1/auth/new-user", {
          username,
          email,
          pass,
        })
        .then((res) => res.data)
        .then((data) => {
          if (data.valid) {
            console.log("created");
            this.onChangeMode("login");
            this.setState({ email: data.email });
          } else {
            console.log(data);
          }
        })
        .catch((err) => console.log(err));
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
            changeModeFunction={this.onChangeMode}
            errors={this.state.authErrors}
            email={this.state.email}
            pass={this.state.pass}
          />
        ) : (
          <NewUserPage
            createUserFunction={this.onNewUserCreation}
            setUsernameFunction={(e) =>
              this.setState({ username: e.target.value })
            }
            setEmailFunction={(e) => this.setState({ email: e.target.value })}
            setPassFunction={(e) => this.setState({ pass: e.target.value })}
            changeModeFunction={this.onChangeMode}
            errors={this.state.authErrors}
            username={this.state.username}
            email={this.state.email}
            pass={this.state.pass}
          />
        )}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
