import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

class LogIn extends React.Component {
  state = {
    email: "",
    password: "",
    username: ""
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    axios
      .post("https://leboncoin-api.herokuapp.com/api/user/log_in", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        if (response.data && response.data.token) {
          this.props.setUser({
            token: response.data.token,
            _id: response.data._id,
            username: response.data.account.username
          });

          this.props.history.push(`/profile/ + ${response.data._id}`);
        }
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };

  render() {
    console.log(this.props.location);
    console.log(this.props.history);
    return (
      <React.Fragment>
        <div className="container-1024 log_in-box box-shadow f-d-ver a-i-center">
          <div className="w-50 d-flex f-d-ver a-i-center">
            <div className="w-80 d-flex f-d-ver">
              <div className="log_in-header">Connexion</div>
              <form
                onSubmit={this.onSubmit}
                className="form form-login d-flex f-d-ver"
              >
                <label className="form-label" htmlFor="email">
                  Adresse email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="form-box"
                />
                <label className="form-label" htmlFor="email">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  className="form-box"
                />
                <input
                  className="validate-login"
                  type="submit"
                  value="Se Connecter"
                />
              </form>
            </div>
            <hr />
            <div className="w-80 d-flex f-d-ver a-i-center">
              <div className="no-account">Vous n'avez pas de compte?</div>
              <div className="link-to-signup w-100 d-flex j-c-center a-i-center">
                <Link to="/sign_up">Créer un compte</Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LogIn;
