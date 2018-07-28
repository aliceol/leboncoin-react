import React from "react";

class Profile extends React.Component {
  render() {
    return (
      <div className="container-1024">
        <h2>profile id: {this.props.match.params.id}</h2>
      </div>
    );
  }
}

export default Profile;
