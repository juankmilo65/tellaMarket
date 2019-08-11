import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { createItem } from "../create/actions/createItemActions";

class CreateItem extends Component {
  state = {
    title: "",
    content: "",
    image: ""
  };
  handleChange = e => {
    if (e.target.id === "image") {
      this.setState({
        [e.target.id]: e.target.files[0]
      });
    } else {
      this.setState({
        [e.target.id]: e.target.value
      });
    }

    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { profile, auth } = this.props;
    const item = {
      ...this.state,
      ownerLastName: profile.lastName,
      ownerName: profile.firstName,
      authId: auth.uid,
      createAt: new Date()
    };

    this.props.createItem(item);
    this.props.history.push("/");
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
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
          <div className="input-field">
            <label htmlFor="content">Foto</label>
            <input
              type="file"
              className="materialize-textarea"
              id="image"
              onChange={this.handleChange}
            />
          </div>

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
    profile: state.firebase.profile
  };
};

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    { createItem }
  )
)(CreateItem);
