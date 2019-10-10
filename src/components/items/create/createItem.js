import React, { Component } from "react";
//import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { createItem } from "../create/actions/createItemActions";
import FileUpload from "../../commons/fileUpload/fileUpload";
import Steps from "../steps/steps";
import Categories from "../category/categories";
import ProductInformation from "../productInformation/productInformation";
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
      <div className="container pd-top--130px pb-4">
        <div className="title-product">
          <h2>Vende con Nosotros</h2>
          <label>Edición Producto</label>
        </div>
        <Steps />
        <Categories />
        <ProductInformation />

        <div className="box-product mt-1 mb-1">
          <div className="title-box">
            <label>Cargar Archivos Multimedia</label>
            <div className="d-flex">
              <button className="btns btn-se mr-3">atras</button>
              <button className="btns btn-go">Siguiente</button>
            </div>
          </div>
          <div className="upload-image">
            <div className="box-group">
              <div className="box active">
                <i className="material-icons">add_photo_alternate</i>
                <span> Subir Archivos </span>
              </div>
              <div className="box">
                <i className="material-icons">add_photo_alternate</i>
                <span> Subir Archivos </span>
              </div>
              <div className="box">
                <i className="material-icons">add_photo_alternate</i>
                <span> Subir Archivos </span>
              </div>
              <div className="box">
                <i className="material-icons">add_photo_alternate</i>
                <span> Subir Archivos </span>
              </div>
              <div className="box">
                <i className="material-icons">add_photo_alternate</i>
                <span> Subir Archivos </span>
              </div>
            </div>
            <div className="box-upload">
              <span>También puedes arrastrar</span>
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
