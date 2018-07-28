import React from "react";
import axios from "axios";
import ReactFileReader from "react-file-reader";

import Preview from "../components/Preview";

const MAX_UPLOADED_FILES = process.env.MAX_UPLOADED_FILES;

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
    axios
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
    console.log(files);
    let newFiles = [...this.state.files];
    let newFilesLength = newFiles.length;
    let slotLeft = MAX_UPLOADED_FILES - newFilesLength;
    if (slotLeft === 0) {
      // PAS FINI
    }
    newFiles = newFiles.concat(files.base64);
    this.setState({
      files: newFiles
    });
  };

  removeFile = index => {
    let newFiles = [...this.state.files];
    newFiles.splice(index, 1);
    this.setState(
      {
        files: newFiles
      },
      () => console.log("state", this.state)
    );
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
        <div className="publish-box">
          <form onSubmit={this.onSubmit} className="form">
            <p>Votre annonce</p>
            <label htmlFor="title">Titre de l'annonce</label>
            <input
              id="title"
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <label htmlFor="description">Texte de l'annonce</label>
            <textarea
              id="description"
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <label htmlFor="price">Prix</label>
            <input
              id="price"
              name="price"
              type="text"
              value={this.state.price}
              onChange={this.handleChange}
            />
            <ul>
              {this.renderPictures()}
              <li>
                <ReactFileReader
                  fileTypes={[".png", "jpg", "jpeg"]}
                  base64={true}
                  handleFiles={this.handleFiles}
                  multipleFiles={true}
                >
                  <button className="btn">Upload</button>
                </ReactFileReader>
              </li>
            </ul>
            <input type="submit" value="Valider" />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Publish;
