import React, { Component } from "react";
//import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { createItem } from "../create/actions/createItemActions";
import FileUpload from "../../commons/fileUpload/fileUpload";
import "./createItem.scss";

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
    // const { auth, fileUpload } = this.props;

    // if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="pd-top--130px container">
        <div>
            {/* <form onSubmit={this.handleSubmit} className="white">  ****Informacion anterior****
              <h5 className="grey-text text-darken-3"></h5>
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
            </form> */}
        </div>
        <div className="title-product">
          <h2>Vende con Nosotros</h2>
          <label>Edición Producto</label>
        </div>
        <div className="box-steps">
            <div className="steps-items">
              <span className="number active">1</span>
              <label>Categorías</label>
            </div>
            <div className="steps-items">
              <span className="number">2</span>
              <label>Descripción</label>
            </div>
            <div className="steps-items">
              <span className="number">2</span>
              <label>Fotos</label>
            </div>
            <div className="steps-items">
              <span className="number">2</span>
              <label>Confirmación</label>
            </div>
        </div>
        <div className="box-product">
          <div className="title-box">
            <label>Seleccione una Categoría</label>
            <button className="btns btn-go">Siguiente</button>
          </div>
          <div>
          <div class="custom-control custom-radio">
            <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input"/>
            <label class="custom-control-label" for="customRadio1">Equipamiento de laboratorio textil <span>(793)</span></label>
          </div>
          <div class="custom-control custom-radio">
            <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input"/>
            <label class="custom-control-label" for="customRadio2">  Equipo clínico y de laboratorio <span>(1)</span></label>
          </div>
          </div>
        </div>

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
