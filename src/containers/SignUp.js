import React from "react";
import axios from "axios";
import "./signUp.css";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    password2: "",
    username: "",
    partnerInfo: false,
    generalConditions: false
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
    if (!this.state.generalConditions) {
      alert(
        "Vous devez accepter les conditions générales pour créer un compte."
      );
    } else if (this.state.password !== this.state.password2) {
      alert("veuillez entrer deux fois le même mot de passe");
    } else {
      axios
        .post("https://leboncoin-api.herokuapp.com/api/user/sign_up", {
          email: this.state.email,
          password: this.state.password,
          username: this.state.username
        })
        .then(response => {
          if (response.data && response.data.token) {
            this.props.setUser({
              token: response.data.token,
              username: response.data.account.username,
              _id: response.data._id
            });

            this.props.history.push("/");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    event.preventDefault();
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-1024 d-flex">
          <div className="box-shadow create-account-box d-flex">
            <div className="flex-1">
              <h3 className="create-account">Pourquoi créer un compte?</h3>
              <div className="d-flex a-i-center advantages">
                <i className="icon far fa-clock blue-icon" />
                <div className="f-d-ver">
                  <h4 className="advantages-title">Gagnez du temps</h4>
                  <p>
                    Publiez vos annonces rapidement, avec vos informations
                    pré-remplies chaque fois que vous souhaitez déposer une
                    nouvelle annonce.
                  </p>
                </div>
              </div>
              <div className="icon d-flex a-i-center advantages">
                <i className="fas fa-bell blue-icon" />
                <div className="f-d-ver">
                  <h4 className="advantages-title">
                    Soyez les premiers informés
                  </h4>
                  <p>
                    Créez des alertes Immo ou Emploi et ne manquez jamais
                    l'annonce qui nous intéresse.
                  </p>
                </div>
              </div>
              <div className="d-flex a-i-center advantages">
                <i className="iconfas fa-eye blue-icon" />
                <div className="f-d-ver">
                  <h4 className="advantages-title">Visibilité</h4>
                  <p>
                    Suivez les statistiques de vos annonces (nombre de fois où
                    votre annonce a été vue, nombre de contacts reçus).
                  </p>
                </div>
              </div>
            </div>
            <form
              onSubmit={this.onSubmit}
              className="form form-signup flex-1 f-d-ver"
            >
              <h3 className="create-account-title">Créez un compte</h3>
              <hr className="hr-create-account" />
              <div className="create-account-content d-flex f-d-ver">
                <label className="form-label" htmlFor="username">
                  Pseudo
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={this.state.username}
                  onChange={this.handleChange}
                  className="flex-1 form-box"
                />
                <label className="form-label" htmlFor="email">
                  Adresse email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="flex-1 form-box"
                />

                <div className="passwords form-line d-flex j-c-sb">
                  <div className="d-flex f-d-ver password-line">
                    <label className="form-label" htmlFor="password">
                      Mot de passe
                    </label>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      className="flex-1 form-box"
                    />
                  </div>
                  <div className="d-flex f-d-ver password-line">
                    <label className="form-label " htmlFor="password2">
                      Confirmer le mot de passe
                    </label>
                    <input
                      id="password2"
                      name="password2"
                      type="password"
                      value={this.state.password2}
                      onChange={this.handleChange}
                      className="flex-1 form-box"
                    />
                  </div>
                </div>
                <div className="checkbox-line d-flex a-i-center">
                  <input
                    id="partnerInfo"
                    name="partnerInfo"
                    type="checkbox"
                    checked={this.state.partnerInfo}
                    onChange={this.handleChange}
                    className="checkbox-input"
                  />
                  <label htmlFor="partnerInfo" className="checkbox-label">
                    Je souhaite recevoir des offres des partenaires du site
                    leboncoin susceptibles de m'interesser
                  </label>
                </div>
                <div className="checkbox-line d-flex a-i-center">
                  <input
                    id="generalConditions"
                    name="generalConditions"
                    type="checkbox"
                    checked={this.state.generalConditions}
                    onChange={this.handleChange}
                    className="checkbox-input"
                  />
                  <label htmlFor="generalConditions" className="checkbox-label">
                    &laquo; J'accepte les{" "}
                    <span className="gen-cond-hightlight">
                      Conditions Générales de Vente
                    </span>{" "}
                    &raquo;
                  </label>
                </div>
                <input
                  type="submit"
                  value="Créer mon Compte Personnel"
                  className="validate-sign-up"
                />
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SignUp;
