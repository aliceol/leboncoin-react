import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./home.css";
const queryString = require("query-string");

class Home extends React.Component {
  state = {
    offers: [],
    title: "",
    priceMin: "",
    priceMax: "",
    sort: "date-desc",
    skip: 0,
    limit: 25
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    this.getData();
    event.preventDefault();
  };

  incrementPage = () => {
    if (this.state.offers.length === 25) {
      this.setState(
        {
          skip: this.state.skip + 25
        },
        this.getData
      );
    }
  };
  decrementPage = () => {
    if (this.state.skip >= 25) {
      this.setState(
        {
          skip: this.state.skip - 25
        },
        this.getData
      );
    }
  };

  generateURL = () => {
    const searchParameters = { ...this.state };

    const parametersKeys = Object.keys(searchParameters);
    for (let i = 0; i < parametersKeys.length; i++) {
      if (
        parametersKeys[i] === "offers" ||
        searchParameters[parametersKeys[i]] === ""
      ) {
        delete searchParameters[parametersKeys[i]];
      }
    }
    const URLParameters = queryString.stringify(searchParameters);
    const URLGenerated =
      "https://leboncoin-api.herokuapp.com/api/offer?" + URLParameters;
    return URLGenerated;
  };

  getData = () => {
    const URLGenerated = this.generateURL();

    axios.get(URLGenerated).then(response =>
      this.setState({
        offers: response.data
      })
    );
  };

  render() {
    const offersList = [...this.state.offers];

    const offersRender = [];
    if (offersList.length === 0) {
      offersRender.push(<div key="1">Il n'y a pas d'annonces à afficher</div>);
    } else {
      for (let i = 0; i < this.state.offers.length; i++) {
        offersRender.push(
          <li key={i} className="ad-box d-flex">
            <div className="image-box">
              {offersList[i].pictures[0] ? (
                <img
                  className="offer-image"
                  src={offersList[i].pictures[0].secure_url}
                  alt="offer"
                />
              ) : (
                <div className="ad-image" />
              )}
            </div>

            <div className="box-content">
              <Link to={"/offer/" + offersList[i]._id}>
                <p className="title">{offersList[i].title}</p>
              </Link>
              <p className="price">
                {offersList[i].price ? offersList[i].price + " €" : null}
              </p>
            </div>
          </li>
        );
      }
    }

    return (
      <React.Fragment>
        <div className="search-bar">
          <form
            className="container-1024 d-flex f-d-ver h-100 j-c-sb"
            onSubmit={this.handleSubmit}
          >
            <div className="form-line d-flex j-c-sb a-i-center">
              <input
                className="form-box"
                type="text"
                name="title"
                placeholder="Que recherchez-vous ?"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <input
                className="search-button"
                type="submit"
                value="Rechercher"
              />
            </div>
            <div className="form-line d-flex j-c-sb a-i-center">
              <span className="inline-text">Prix entre</span>
              <input
                className="form-box"
                type="text"
                name="priceMin"
                placeholder="Prix min"
                value={this.state.priceMin}
                onChange={this.handleChange}
              />
              <span className="inline-text"> € et</span>
              <input
                type="text"
                className="form-box"
                name="priceMax"
                placeholder="Prix max"
                value={this.state.priceMax}
                onChange={this.handleChange}
              />
              <span className="inline-text"> €</span>
              <select
                onChange={this.handleChange}
                name="sort"
                className="form-box sort"
              >
                <option value="date-desc">Plus récentes</option>
                <option value="date-asc">Plus anciennes</option>
                <option value="price-asc">Prix croissants</option>
                <option value="price-desc">Prix décroissants</option>
              </select>
            </div>
          </form>
        </div>
        <div className="container-1024 d-flex f-d-ver">
          <ul className="ad-list">{offersRender}</ul>
          <div className="form-line d-flex j-c-center">
            <button className="nav-button" onClick={this.decrementPage}>
              Page précédente
            </button>
            <span className="d-flex a-i-center">
              Page {this.state.skip / 25 + 1}
            </span>
            <button className="nav-button" onClick={this.incrementPage}>
              Page suivante
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.getData();
  }
}

export default Home;
