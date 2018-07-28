import React from "react";
import axios from "axios";
import "./offer.css";

class Offer extends React.Component {
  state = {
    offer: {},
    user: this.props.user,
    phoneDisplayed: false,
    imageIndex: 0
  };
  decrementImage = () => {
    if (this.state.imageIndex > 0) {
      this.setState({ imageIndex: this.state.imageIndex - 1 });
    }
  };

  incrementImage = () => {
    if (this.state.imageIndex < this.state.offer.pictures.length - 1) {
      this.setState({ imageIndex: this.state.imageIndex + 1 });
    }
  };

  render() {
    if (!this.state.offer._id) {
      return <div>isLoading...</div>;
    } else {
      const pictures = [];
      if (this.state.offer.pictures.length !== 0) {
        for (let i = 0; i < this.state.offer.pictures.length; i++) {
          pictures.push(this.state.offer.pictures[i].secure_url);
        }
      }
      return (
        <React.Fragment>
          <div className="container-1024 d-flex p-t-30">
            <div className="offer-info flex-1">
              <div className="offer-heart box-shadow">
                <div className="image-container d-flex j-c-center">
                  {this.state.offer.pictures.length > 1 &&
                  this.state.imageIndex > 0 ? (
                    <button
                      className="previous-button"
                      onClick={this.decrementImage}
                    >
                      <i class="fas fa-chevron-left d-flex arrow a-i-center j-c-center" />
                    </button>
                  ) : (
                    ""
                  )}
                  {this.state.offer.pictures.length > 0 ? (
                    <img
                      className="image-container-empty offer-image"
                      src={
                        this.state.offer.pictures[this.state.imageIndex]
                          .secure_url
                      }
                      alt="offer"
                    />
                  ) : (
                    <div className="image-container-empty" />
                  )}
                  {this.state.offer.pictures.length > 1 &&
                  this.state.imageIndex <
                    this.state.offer.pictures.length - 1 ? (
                    <button onClick={this.incrementImage}>
                      <i className="fas fa-chevron-right next-button arrow d-flex a-i-center j-c-center" />
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="offer-title-and-price">
                  <div className="offer-title">{this.state.offer.title}</div>
                  <div className="offer-price">{this.state.offer.price} €</div>
                </div>
              </div>
              <div>
                <h4 className="description">Description</h4>
                <div>{this.state.offer.description}</div>
              </div>
            </div>
            <div className="d-flex f-d-ver user-info box-shadow">
              <div className="d-flex j-c-center a-i-center">
                <div className="user-icon d-flex j-c-center a-i-center">
                  <div className="circle">
                    <div className="d-flex j-c-center a-i-center">
                      <i className="fas fa-user user-icon-white" />
                    </div>
                  </div>
                </div>
                {this.state.offer.creator.account.username}
              </div>
              <div
                className="user-phone"
                onClick={() => {
                  this.setState({ phoneDisplayed: !this.state.phoneDisplayed });
                }}
              >
                {this.state.phoneDisplayed ? (
                  this.state.offer.creator.account.phone ? (
                    this.state.offer.creator.account.phone
                  ) : (
                    "Pas de numéro renseigné"
                  )
                ) : (
                  <div>
                    <i className="fas fa-phone" /> Voir le numéro{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }

  componentDidMount() {
    const offerId = this.props.match.params.id;
    axios
      .get(`https://leboncoin-api.herokuapp.com/api/offer/${offerId}`)
      .then(response => {
        this.setState({ offer: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default Offer;
