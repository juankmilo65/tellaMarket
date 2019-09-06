import React, { Component } from "react";
import { connect } from "react-redux";
import { setFile } from "./actions/fileUploadActions";

class FileUpload extends Component {
  state = {
    image: null,
    url: "",
    error: ""
  };

  // handleUpload = e => {
  //   const { props, state } = this;
  //   const { firebase, files } = props;
  //   //const fileUpload = { ...state };

  //   if (
  //     files.length > 0 &&
  //     files.filter(e => e.name === e.target.files[0].name)
  //   ) {
  //     this.setState({ error: "archivo ya existe con el mismo nombre" });
  //   } else {
  //     files.push(e.target.files[0]);
  //   }

  //   props.setFile(files);
  //};

  render() {
    // const { auth, profile, fileUpload } = this.props;
    return (
      <div>{/* <input type="file" onChange={this.handleUpload} /> */}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    files: state.fileUpload.files
  };
};

export default connect(
  mapStateToProps,
  { setFile }
)(FileUpload);
