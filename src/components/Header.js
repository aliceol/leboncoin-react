import React from "react";
import { NavLink, withRouter } from "react-router-dom";

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
          <li>
            <NavLink to={"/profile/" + this.props.user._id}>
              {this.props.user.username}
            </NavLink>
          </li>
          <li>
            <button onClick={this.onLogOut}>Déconnexion</button>
          </li>
        </React.Fragment>
      );
    }
    return (
      <div>
        <NavLink to="/sign_up">Créer un compte</NavLink>
        <NavLink to="/log_in">Se connecter</NavLink>
      </div>
    );
  }
  render() {
    return (
      <header className="header">
        <div className="container-1024">
          <img id="logo" src="./logo_leboncoin.png" alt="logo" />
          <ul className="nav-list">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {this.renderNav()}
          </ul>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
