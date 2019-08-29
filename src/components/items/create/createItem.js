import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { createItem } from "../create/actions/createItemActions";
import FileUpload from "../../commons/fileUpload/fileUpload";

class CreateItem extends Component {
  state = {
    title: "",
    content: "",
    images: null
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { profile, auth, fileUpload } = this.props;
    const item = {
      ...this.state,
      ownerLastName: profile.lastName,
      ownerName: profile.firstName,
      authId: auth.uid,
      images: fileUpload,
      createAt: new Date()
    };

    this.props.createItem(item);
    this.props.history.push("/");
  };
  render() {
    const { auth, fileUpload } = this.props;

    // if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create New Project</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="content">Project Content</label>
            <textarea
              className="materialize-textarea"
              id="content"
              onChange={this.handleChange}
            />
          </div>
          <FileUpload />
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    fileUpload: state.fileUpload
  };
};

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    { createItem }
  )
)(CreateItem);
