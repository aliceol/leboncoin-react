import React from "react";
import axios from "axios";
import ReactFileReader from "react-file-reader";
import "./Publish.css";

import Preview from "../components/Preview";

const MAX_UPLOADED_FILES = 6;

class Publish extends React.Component {
  state = {
    title: "",
    description: "",
    files: [],
    price: ""
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
    console.log(this.state);
    console.log("title", this.state.title.length);
    console.log("desc", this.state.description.length);
    console.log("files", this.state.files.length);
    console.log("price", this.state.price.length);
    this.state.title.length === 0 ||
    this.state.description.length === 0 ||
    this.state.files.length === 0 ||
    this.state.price.length === 0
      ? alert("Veuillez remplir tous les champs et insérer au moins une image")
      : axios
          .post(
            "https://leboncoin-api.herokuapp.com/api/offer/publish",
            {
              title: this.state.title,
              description: this.state.description,
              price: this.state.price,
              files: this.state.files
            },
            { headers: { Authorization: "Bearer " + this.props.user.token } }
          )
          .then(response => {
            if (response.data && response.data._id) {
              alert("annonce ajoutée");
              this.props.history.push(`/`);
            }
          })
          .catch(err => {
            console.log(err);
          });
    event.preventDefault();
  };

  /*   renderImage = files => {
    const newFiles = [...this.state.files];
    const filesToRender = [];
    for (let i = 0; i < files.length; i++) {
      filesToRender.push(
        <li>
          <img className="renderedpic" src={newFiles[i]} alt="preview" />
        </li>
      );
    }
    return <ul>{filesToRender}</ul>;
  };
 */

  handleFiles = files => {
    let newFiles = [...this.state.files];
    let newFilesLength = newFiles.length;
    let slotLeft = MAX_UPLOADED_FILES - newFilesLength;
    if (slotLeft < newFiles.concat(files.base64).length) {
      alert(
        "Vous pouvez insérer " + MAX_UPLOADED_FILES + " photos au maximum."
      );
    } else {
      newFiles = newFiles.concat(files.base64);
      this.setState({
        files: newFiles
      });
    }
  };

  removeFile = index => {
    let newFiles = [...this.state.files];
    newFiles.splice(index, 1);
    this.setState({
      files: newFiles
    });
  };

  renderPictures() {
    if (this.state.files.length) {
      const pictures = [];
      this.state.files.forEach((image, index) => {
        pictures.push(
          <Preview
            key={index}
            index={index}
            src={image}
            removeFile={this.removeFile}
          />
        );
      });
      return pictures;
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <form
          onSubmit={this.onSubmit}
          className="container-1024 d-flex f-d-ver"
        >
          <div className="publication-box d-flex f-d-ver">
            <p className="background-grey w-100 your-offer">Votre annonce</p>
            <div className="d-flex">
              <div className="flex-1 d-flex f-d-ver publish-content">
                <label className="form-label" htmlFor="title">
                  Titre de l'annonce
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={this.state.title}
                  onChange={this.handleChange}
                  className="form-box "
                />
                <label className="form-label" htmlFor="description">
                  Texte de l'annonce
                </label>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  value={this.state.description}
                  onChange={this.handleChange}
                  className="form-box description-input"
                />
                <label htmlFor="price" className="form-label">
                  Prix
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  value={this.state.price}
                  onChange={this.handleChange}
                  className="form-box"
                />
              </div>
              <div className="flex-1 publish-pictures">
                <ul className="d-flex pictures-list">
                  {this.renderPictures()}
                </ul>
                <div className="d-flex w-100 j-c-center">
                  <ReactFileReader
                    fileTypes={[".png", "jpg", "jpeg"]}
                    base64={true}
                    handleFiles={this.handleFiles}
                    multipleFiles={true}
                  >
                    <button
                      className="btn upload-pictures"
                      onClick={event => event.preventDefault()}
                    >
                      Ajouter des photos
                    </button>
                  </ReactFileReader>
                </div>
              </div>
            </div>
          </div>

          <input className="validate-publish" type="submit" value="Valider" />
        </form>
      </React.Fragment>
    );
  }
}

export default Publish;
