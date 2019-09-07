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
      <div className="container pd-top--130px pb-4">
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
              <span className="number">3</span>
              <label>Fotos</label>
            </div>
            <div className="steps-items">
              <span className="number">4</span>
              <label>Confirmación</label>
            </div>
        </div>
        <div className="box-product mt-1 mb-1">
          <div className="title-box">
            <label>Seleccione una Categoría</label>
            <button className="btns btn-go">Siguiente</button>
          </div>
          <div className="d-flex">
            <div className="col-6 pt-4">
              <div class="custom-control custom-radio radio-tella">
                <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input"/>
                <label class="custom-control-label" for="customRadio1">Equipamiento de laboratorio textil <span>(793)</span></label>
              </div>
              <div class="custom-control custom-radio radio-tella">
                <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input"/>
                <label class="custom-control-label" for="customRadio2">  Equipo clínico y de laboratorio <span>(1)</span></label>
              </div>
              <div class="custom-control custom-radio radio-tella">
                <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input"/>
                <label class="custom-control-label" for="customRadio3">  Fabricación de hilados  <span>(483)</span></label>
              </div>
              <div class="custom-control custom-radio radio-tella">
                <input type="radio" id="customRadio4" name="customRadio" class="custom-control-input"/>
                <label class="custom-control-label" for="customRadio4">Fabricación de hilados (sintéticos, algodón) <span>(5,493)</span></label>
              </div>
              <div class="custom-control custom-radio radio-tella">
                <input type="radio" id="customRadio5" name="customRadio" class="custom-control-input"/>
                <label class="custom-control-label" for="customRadio5">  Maquinaria para tejer<span>(3,764)</span></label>
              </div>
              <div class="custom-control custom-radio radio-tella">
                <input type="radio" id="customRadio6" name="customRadio" class="custom-control-input"/>
                <label class="custom-control-label" for="customRadio6">  Acabado y otros equipos de prensa  <span>(483)</span></label>
              </div>
            </div>
            <div className="col-6 pt-4">
              <div class="custom-control custom-radio radio-tella">
                <input type="radio" id="customRadio11" name="customRadio" class="custom-control-input"/>
                <label class="custom-control-label" for="customRadio11">Equipamiento de laboratorio textil <span>(793)</span></label>
              </div>
              <div class="custom-control custom-radio radio-tella">
                <input type="radio" id="customRadio12" name="customRadio" class="custom-control-input"/>
                <label class="custom-control-label" for="customRadio12">  Equipo clínico y de laboratorio <span>(1)</span></label>
              </div>
              <div class="custom-control custom-radio radio-tella">
                <input type="radio" id="customRadio13" name="customRadio" class="custom-control-input"/>
                <label class="custom-control-label" for="customRadio13">  Fabricación de hilados  <span>(483)</span></label>
              </div>
              <div class="custom-control custom-radio radio-tella">
                <input type="radio" id="customRadio14" name="customRadio" class="custom-control-input"/>
                <label class="custom-control-label" for="customRadio14">Fabricación de hilados (sintéticos, algodón) <span>(5,493)</span></label>
              </div>
              <div class="custom-control custom-radio radio-tella">
                <input type="radio" id="customRadio15" name="customRadio" class="custom-control-input"/>
                <label class="custom-control-label" for="customRadio15">  Maquinaria para tejer<span>(3,764)</span></label>
              </div>
              <div class="custom-control custom-radio radio-tella">
                <input type="radio" id="customRadio16" name="customRadio" class="custom-control-input"/>
                <label class="custom-control-label" for="customRadio16">  Acabado y otros equipos de prensa  <span>(483)</span></label>
              </div>
            </div>
          </div>
        </div>

        <div className="box-product mt-1 mb-1">
          <div className="title-box">
            <label>Información del Producto</label>
            <button className="btns btn-se">atras</button>
            <button className="btns btn-go">Siguiente</button>
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
