import React, { Component } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { createMenu } from "../menu/actions/createMenuActions";
import { Redirect } from "react-router-dom";
import "./createMenu.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }
  return (
    <div className="pd-top--130px">
      <div className="container">
        <form onSubmit={state.handleSubmit}>
          <div class="row justify-content-md-center">
            <div>
              <div class="input-group">
                <label htmlFor="englishMachine">.</label>
              </div>
              <div class="input-group">
                <label style={{ width: 150 + "px" }} htmlFor="englishMachine">
                  Maquinaria y Equipo
                </label>
              </div>
              <div class="input-group">
                <label style={{ width: 150 + "px" }} htmlFor="englishMachine">
                  Categoria
                </label>
              </div>
              <div class="input-group">
                <label style={{ width: 150 + "px" }} htmlFor="englishMachine">
                  Subcategoria
                </label>
              </div>
              <div class="input-group">
                <label style={{ width: 150 + "px" }} htmlFor="englishMachine">
                  Articulo 1
                </label>
              </div>
            </div>
            <div>
              <div class="input-group">
                <label htmlFor="englishMachine">Ingles</label>
              </div>
              <div class="input-group">
                <input type="text" class="form-control" />
              </div>
              <div class="input-group">
                <input type="text" class="form-control" />
              </div>
              <div class="input-group">
                <input type="text" class="form-control" />
              </div>
            </div>
            <div>
              <div class="input-group">
                <label htmlFor="englishMachine">Español</label>
              </div>
              <div class="input-group">
                <input type="text" class="form-control" />
              </div>
              <div class="input-group">
                <input type="text" class="form-control" />
              </div>
              <div class="input-group">
                <input type="text" class="form-control" />
              </div>
            </div>
            <div>
              <div class="input-group">
                <label htmlFor="englishMachine">Portugues</label>
              </div>
              <div class="input-group">
                <input type="text" class="form-control" />
              </div>
              <div class="input-group">
                <input type="text" class="form-control" />
              </div>
              <div class="input-group">
                <input type="text" class="form-control" />
              </div>
            </div>
          </div>

          {state.newItem &&
            state.newItem.map(item => {
              return item;
            })}

          <div class="row justify-content-md-center">
            <div>
              <button onClick={state.handleAddItem}>
                Agregar nuevo Articulo
              </button>
              <button>Guardar Catalogo</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

class CreateMenu extends Component {
  displayData = [];
  state = {
    language: "",
    menu: "MachinesAndEquipment",
    categoryName: "",
    subCategoryName: "",
    newItem: this.displayData,
    countItems: 2
  };
  handleSubmit = e => {
    e.preventDefault();
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleDeleteItem = e => {
    this.displayData = [];
    this.displayData = this.state.newItem.filter(item => {
      return item.key !== e.currentTarget.parentNode.parentNode.parentNode.id;
    });
    this.setState({
      ["newItem"]: this.displayData
    });
  };

  handleAddItem = () => {
    this.setState({ countItems: this.state.countItems + 1 });
    this.displayData.push(
      <div
        key={this.state.countItems}
        id={this.state.countItems}
        class="row justify-content-md-center"
      >
        <div>
          <div>
            <label style={{ width: 150 + "px" }} htmlFor="englishMachine">
              Articulo {this.state.countItems}
            </label>
          </div>
        </div>
        <div>
          <div class="input-group">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div>
          <div class="input-group">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div>
          <div class="input-group">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div>
          <div class="input-group">
            <button onClick={this.handleDeleteItem}>Eliminar Item</button>
          </div>
        </div>
      </div>
    );
    this.setState({
      ["newItem"]: this.displayData
    });
  };

  render() {
    const { lang, auth } = this.props;
    //if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <MyComponent
        lang={lang}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        newItem={this.state.newItem}
        handleAddItem={this.handleAddItem}
        handleDeleteItem={this.handleDeleteItem}
      />
    );
  }
}

const mapStateToProps = state => ({
  lang: state.navar.lang,
  auth: state.firebase.auth
});

export default connect(
  mapStateToProps,
  { createMenu }
)(CreateMenu);
