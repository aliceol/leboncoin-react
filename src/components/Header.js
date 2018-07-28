import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./header.css";

class Header extends React.Component {
  onLogOut = event => {
    this.props.logOut();
    this.props.history.push("/");
    event.preventDefault();
  };
  renderNav() {
    if (this.props.user._id) {
      return (
        <React.Fragment>
          <li className="header-button header-button-border d-flex j-c-sb a-i-center ">
            <NavLink to={"/profile/" + this.props.user._id}>
              <i className="fas fa-user" /> {this.props.user.username}
            </NavLink>
          </li>
          <li className="header-button header-button-border d-flex j-c-sb a-i-center ">
            <button className="header-button" onClick={this.onLogOut}>
              DECONNEXION
            </button>
          </li>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <li className="header-button header-button-border d-flex j-c-sb a-i-center ">
          <NavLink to="/sign_up">CRÉER UN COMPTE</NavLink>
        </li>
        <li className="header-button header-button-border d-flex j-c-sb a-i-center">
          <NavLink to="/log_in">SE CONNECTER</NavLink>
        </li>
      </React.Fragment>
    );
  }

  publishRedirection() {
    if (this.props.user.token) {
      return (
        <li className="header-button d-flex j-c-sb a-i-center">
          <NavLink to="/publish">DÉPOSER UNE ANNONCE</NavLink>
        </li>
      );
    } else {
      return (
        <li className="header-button d-flex j-c-sb a-i-center">
          <NavLink to="/log_in">DÉPOSER UNE ANNONCE</NavLink>
        </li>
      );
    }
  }

  render() {
    return (
      <header className="header d-flex a-i-center">
        <div className="container-1024 d-flex j-c-sb a-i-center h-100">
          <ul className="nav-list d-flex a-i-center j-c-sb h-100">
            <li>
              <NavLink to="/">
                <img id="logo" src="/logo_leboncoin.png" alt="logo" />
              </NavLink>
            </li>
            {this.publishRedirection()}
            <li className="header-button d-flex j-c-sb a-i-center">
              <NavLink to="/">OFFRES</NavLink>
            </li>
          </ul>{" "}
          <ul className="nav-list d-flex a-i-center j-c-sb">
            {this.renderNav()}
          </ul>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
