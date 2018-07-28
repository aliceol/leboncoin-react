import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
        <form onSubmit={this.onSubmit} className="form form-signup">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="email">password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input type="submit" value="Valider" />
        </form>
        <hr />
        <div>
          <div>Vous n'avez pas de compte?</div>
          <Link to="/sign_up">Créer un compte</Link>
        </div>
      </React.Fragment>
    );
  }
}

export default LogIn;
