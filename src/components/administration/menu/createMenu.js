import React, { Component } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { createMenu } from "../menu/actions/createMenuActions";
import Autocomplete from "../../commons/autocomplete/Autocomplete";
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
        <div>
          <label style={{ width: 150 + "px", "margin-bottom": ".9rem" }}>
            Maquinaria y Equipo
          </label>
        </div>
        <form onSubmit={state.handleSubmit}>
          <div class="row">
            <div>
              <div class="input-group">
                <label htmlFor="englishMachine">.</label>
              </div>

              <div class="input-group">
                <label style={{ width: 150 + "px", "margin-bottom": ".9rem" }}>
                  Categoria
                </label>
              </div>
              <div class="input-group">
                <label style={{ width: 150 + "px", "margin-bottom": ".9rem" }}>
                  Subcategoria
                </label>
              </div>
              <div class="input-group">
                <label style={{ width: 150 + "px", "margin-bottom": ".9rem" }}>
                  Articulo 1
                </label>
              </div>
            </div>
            <div>
              <div class="input-group">
                <label>Ingles</label>
              </div>
              <div class="input-group">
                {/* <input
                  type="text"
                  id="enCategory"
                  class="form-control"
                  onChange={state.handleChange}
                  required
                /> */}
                <div className="App-Component">
                  <div className="App-Component">
                    <Autocomplete idInput="enCategory" />
                  </div>
                </div>
              </div>
              <div class="input-group">
                <input
                  type="text"
                  id="enSubcategory"
                  class="form-control"
                  onChange={state.handleChange}
                  required
                />
              </div>
              <div class="input-group">
                <input
                  type="text"
                  id="enItem1"
                  class="form-control"
                  onChange={state.handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <div class="input-group">
                <label>Español</label>
              </div>
              <div class="input-group">
                <input
                  type="text"
                  id="esCategory"
                  onChange={state.handleChange}
                  class="form-control"
                />
              </div>
              <div class="input-group">
                <input
                  type="text"
                  id="esSubcategory"
                  onChange={state.handleChange}
                  class="form-control"
                />
              </div>
              <div class="input-group">
                <input
                  type="text"
                  id="esItem1"
                  onChange={state.handleChange}
                  class="form-control"
                />
              </div>
            </div>
            <div>
              <div class="input-group">
                <label>Portugues</label>
              </div>
              <div class="input-group">
                <input
                  type="text"
                  id="ptCategory"
                  onChange={state.handleChange}
                  class="form-control"
                />
              </div>
              <div class="input-group">
                <input
                  type="text"
                  id="ptSubCategory"
                  onChange={state.handleChange}
                  class="form-control"
                />
              </div>
              <div class="input-group">
                <input
                  type="text"
                  id="ptItem1"
                  onChange={state.handleChange}
                  class="form-control"
                />
              </div>
            </div>
          </div>

          {state.newItem &&
            state.newItem.map(item => {
              return item;
            })}

          <div class="row">
            <div>
              <button type="button" onClick={state.handleAddItem}>
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
  propertiesEn = [];
  propertiesEs = [];
  propertiesPt = [];
  state = {
    newItem: this.displayData,
    countItems: 2,
    catalogoEn: {},
    catalogoEs: {},
    catalogoPt: {}
  };

  handleSubmit = e => {
    e.preventDefault();
    const { lang } = this.props;
    const listItemEn = {};
    const listItemEs = [];
    const listItemPt = [];
    let category = "";
    let subCagtegory = "";

    const stateProperties = Object.keys(this.state);

    stateProperties.map(state => {
      if (state === "catalogoEn") {
        this.state.catalogoEn.map(item => {
          const englishProperties = Object.keys(item);
          englishProperties.map(property => {
            let count = 2;
            if (property.includes("Item")) {
              const itemPropertyName = Object.keys(this.state.catalogoEn[0]);
              itemPropertyName.map(itemProperty => {
                if (
                  Object.keys(listItemEn).length === 0 &&
                  itemProperty.includes("Item")
                ) {
                  const key = itemProperty.substr(2);
                  const value = Object.values(this.state.catalogoEn[0])[count];
                  listItemEn[key] = value;
                  count = count + 1;
                } else if (itemProperty.includes("Item")) {
                  listItemEn[itemProperty.substr(2)] = Object.values(
                    this.state.catalogoEn[0]
                  )[count];
                  count = count + 1;
                }
              });
            } else if (property.includes("Category")) {
              category = Object.values(this.state.catalogoEn[0])[0];
            } else if (property.includes("Subcategory")) {
              subCagtegory = Object.values(this.state.catalogoEn[0])[1];
            }
          });
        });

        const catalogo = {
          language: "en",
          categoryName: category,
          subCategoryName: subCagtegory,
          items: listItemEn
        };

        this.props.createMenu(catalogo);
      } else if (state === "catalogoEs") {
      } else if (state === "catalogoPt") {
      }
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
    const idEn = "enItem" + this.state.countItems;
    const idEs = "esItem" + this.state.countItems;
    const idPt = "ptItem" + this.state.countItems;
    this.displayData.push(
      <div key={this.state.countItems} id={this.state.countItems} class="row">
        <div>
          <div>
            <label style={{ width: 150 + "px", "margin-bottom": ".9rem" }}>
              Articulo {this.state.countItems}
            </label>
          </div>
        </div>
        <div>
          <div class="input-group">
            <input
              type="text"
              id={idEn}
              onChange={this.handleChange}
              class="form-control"
            />
          </div>
        </div>
        <div>
          <div class="input-group">
            <input
              type="text"
              id={idEs}
              onChange={this.handleChange}
              class="form-control"
            />
          </div>
        </div>
        <div>
          <div class="input-group">
            <input
              type="text"
              id={idPt}
              onChange={this.handleChange}
              class="form-control"
            />
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
        //handleChange={this.handleChange}
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
