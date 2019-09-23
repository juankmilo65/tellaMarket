import React, { Component } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { createMenu } from "../menu/actions/createMenuActions";
import { getDocuments } from "../../commons/data/actions/dataActions";
import Autocomplete from "../../commons/autocomplete/Autocomplete";
import Table from "../../commons/table/Table";
import "./createMenu.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  let countNewItem = 0;
  let displayData = [];
  let displayDataFInish = [];
  let copyState = Object.assign({}, state);

  if (state.newItem.length > 0) {
    state.newItem.map(function(item) {
      let countChild = 0;
      item.props.children.map(function(itemChild) {
        if (
          itemChild.props.children.props.children.type !== null &&
          (itemChild.props.children.props.children.type !== "label" &&
            itemChild.props.children.props.children.type !== "button")
        ) {
          var newItemProp = {
            ...itemChild.props.children.props.children.props.children.props
              .children.props,
            ["value"]:
              this.state[
                itemChild.props.children.props.children.props.children.props
                  .children.props.idInput
              ] === undefined
                ? ""
                : this.state[
                    itemChild.props.children.props.children.props.children.props
                      .children.props.idInput
                  ]
          };

          let childrenProperties = {
            ...itemChild.props.children.props.children.props.children.props
              .children,
            ["props"]: newItemProp
          };

          let childrenPropertiesChidren = {
            ...itemChild.props.children.props.children.props.children.props,
            ["children"]: childrenProperties
          };

          let childrenPropertiesChidrenProperties = {
            ...itemChild.props.children.props.children.props.children,
            ["props"]: childrenPropertiesChidren
          };

          let childrenPropertiesChidrenPropertiesChildren = {
            ...itemChild.props.children.props.children.props,
            ["children"]: childrenPropertiesChidrenProperties
          };

          let childrenPropertiesChidrenPropertiesChildrenProperties = {
            ...itemChild.props.children.props.children,
            ["props"]: childrenPropertiesChidrenPropertiesChildren
          };

          let childrenPropertiesChidrenPropertiesChildrenPropertiesClindren = {
            ...itemChild.props.children.prop,
            ["children"]: childrenPropertiesChidrenPropertiesChildrenProperties
          };

          let childrenPropertiesChidrenPropertiesChildrenPropertiesClindrenProperties = {
            ...itemChild.props.children,
            ["props"]: childrenPropertiesChidrenPropertiesChildrenPropertiesClindren
          };

          let childrenPropertiesChidrenPropertiesChildrenPropertiesClindrenPropertiesChildren = {
            ...itemChild.props,
            ["children"]: childrenPropertiesChidrenPropertiesChildrenPropertiesClindrenProperties
          };

          let childrenPropertiesChidrenPropertiesChildrenPropertiesClindrenPropertiesChildrenProperties = {
            ...itemChild,
            ["props"]: childrenPropertiesChidrenPropertiesChildrenPropertiesClindrenPropertiesChildren
          };

          var f = childrenPropertiesChidrenPropertiesChildrenPropertiesClindrenPropertiesChildrenProperties;
          displayData.push(f);
        } else {
          displayData.push(itemChild);
        }

        countChild = countChild + 1;
      }, copyState);

      var newItemChildren = {
        ...item.props,
        ["children"]: displayData
      };

      displayDataFInish.push({
        ...item,
        ["props"]: newItemChildren
      });

      countNewItem = countNewItem + 1;
      displayData = [];
    }, copyState);

    if (JSON.stringify(state.newItem) !== JSON.stringify(displayDataFInish)) {
      state.this.setState({
        ["newItem"]: displayDataFInish
      });
    }
  }

  return (
    <div className="pd-top--130px">
      <div className="container">
        <div>
          <label style={{ width: 150 + "px", marginBottom: ".9rem" }}>
            Maquinaria y Equipo
          </label>
        </div>
        <form onSubmit={state.handleSubmit}>
          <div className="row">
            <div>
              <div className="input-group">
                <label htmlFor="englishMachine">.</label>
              </div>

              <div className="input-group">
                <label style={{ width: 150 + "px", marginBottom: ".9rem" }}>
                  Categoria
                </label>
              </div>
              <div className="input-group">
                <label style={{ width: 150 + "px", marginBottom: ".9rem" }}>
                  Subcategoria
                </label>
              </div>
              <div className="input-group">
                <label style={{ width: 150 + "px", marginBottom: ".9rem" }}>
                  Articulo 1
                </label>
              </div>
            </div>
            <div>
              <div className="input-group">
                <label>Ingles</label>
              </div>
              <div className="input-group">
                <div className="App-Component">
                  <div className="App-Component">
                    <Autocomplete
                      idInput="enCategory"
                      onChange={state.handleChange}
                      value={state.state["enCategory"]}
                    />
                  </div>
                </div>
              </div>
              <div className="input-group">
                <div className="App-Component">
                  <div className="App-Component">
                    <Autocomplete
                      idInput="enSubcategory"
                      onChange={state.handleChange}
                      value={state.state["enSubcategory"]}
                    />
                  </div>
                </div>
              </div>
              <div className="input-group">
                <div className="App-Component">
                  <div className="App-Component">
                    <Autocomplete
                      idInput="enItem1"
                      onChange={state.handleChange}
                      value={state.state["enItem1"]}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="input-group">
                <label>Español</label>
              </div>
              <div className="input-group">
                <div className="App-Component">
                  <div className="App-Component">
                    <Autocomplete
                      idInput="esCategory"
                      onChange={state.handleChange}
                      value={state.state["esCategory"]}
                    />
                  </div>
                </div>
              </div>
              <div className="input-group">
                <div className="App-Component">
                  <div className="App-Component">
                    <Autocomplete
                      idInput="esSubcategory"
                      onChange={state.handleChange}
                      value={state.state["esSubcategory"]}
                    />
                  </div>
                </div>
              </div>
              <div className="input-group">
                <div className="App-Component">
                  <div className="App-Component">
                    <Autocomplete
                      idInput="esItem1"
                      onChange={state.handleChange}
                      value={state.state["esItem1"]}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="input-group">
                <label>Portugues</label>
              </div>
              <div className="input-group">
                <div className="App-Component">
                  <div className="App-Component">
                    <Autocomplete
                      idInput="ptCategory"
                      onChange={state.handleChange}
                      value={state.state["ptCategory"]}
                    />
                  </div>
                </div>
              </div>
              <div className="input-group">
                <div className="App-Component">
                  <div className="App-Component">
                    <Autocomplete
                      idInput="ptSubCategory"
                      onChange={state.handleChange}
                      value={state.state["ptSubCategory"]}
                    />
                  </div>
                </div>
              </div>
              <div className="input-group">
                <div className="App-Component">
                  <div className="App-Component">
                    <Autocomplete
                      idInput="ptItem1"
                      onChange={state.handleChange}
                      value={state.state["ptItem1"]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {state.newItem &&
            state.newItem.map(item => {
              return item;
            })}

          <div className="row">
            <div>
              <button type="button" onClick={state.handleAddItem}>
                Agregar nuevo Articulo
              </button>
              <button>Guardar Catalogo</button>
              <button type="button" onClick={state.handleCleanForm}>
                Limpiar formulario
              </button>
            </div>
          </div>
        </form>
        {state.catalogList.length === 0 ? (
          <div />
        ) : (
          <Table catalogList={state.catalogList} />
        )}
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
    catalogoPt: {},
    enCategory: "",
    enSubcategory: "",
    enItem1: "",
    esCategory: "",
    esSubcategory: "",
    esItem1: "",
    ptCategory: "",
    ptSubcategory: "",
    ptItem1: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { lang } = this.props;
    const listItemEn = {};
    const listItemEs = {};
    const listItemPt = {};
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
            } else if (property.includes("enCategory")) {
              category = Object.values(this.state.catalogoEn[0])[0];
            } else if (property.includes("enSubcategory")) {
              subCagtegory = Object.values(this.state.catalogoEn[0])[1];
            }
          });
        });

        var subCategoryObj = new Object();
        subCategoryObj[subCagtegory] = listItemEn;

        var myCatalog = new Object();
        myCatalog[category] = subCategoryObj;

        const catalogo = {
          language: "en",
          myCatalog
        };

        this.props.createMenu(catalogo);
      } else if (state === "catalogoEs") {
        this.state.catalogoEs.map(item => {
          const englishProperties = Object.keys(item);
          englishProperties.map(property => {
            let count = 2;
            if (property.includes("Item")) {
              const itemPropertyName = Object.keys(this.state.catalogoEs[0]);
              itemPropertyName.map(itemProperty => {
                if (
                  Object.keys(listItemEs).length === 0 &&
                  itemProperty.includes("Item")
                ) {
                  const key = itemProperty.substr(2);
                  const value = Object.values(this.state.catalogoEs[0])[count];
                  listItemEs[key] = value;
                  count = count + 1;
                } else if (itemProperty.includes("Item")) {
                  listItemEs[itemProperty.substr(2)] = Object.values(
                    this.state.catalogoEs[0]
                  )[count];
                  count = count + 1;
                }
              });
            } else if (property.includes("esCategory")) {
              category = Object.values(this.state.catalogoEs[0])[0];
            } else if (property.includes("esSubcategory")) {
              subCagtegory = Object.values(this.state.catalogoEs[0])[1];
            }
          });
        });

        var subCategoryObj = new Object();
        subCategoryObj[subCagtegory] = listItemEs;

        var myCatalog = new Object();
        myCatalog[category] = subCategoryObj;

        const catalogo = {
          language: "es",
          myCatalog
        };

        this.props.createMenu(catalogo);
      } else if (state === "catalogoPt") {
        this.state.catalogoPt.map(item => {
          const englishProperties = Object.keys(item);
          englishProperties.map(property => {
            let count = 2;
            if (property.includes("Item")) {
              const itemPropertyName = Object.keys(this.state.catalogoPt[0]);
              itemPropertyName.map(itemProperty => {
                if (
                  Object.keys(listItemPt).length === 0 &&
                  itemProperty.includes("Item")
                ) {
                  const key = itemProperty.substr(2);
                  const value = Object.values(this.state.catalogoPt[0])[count];
                  listItemPt[key] = value;
                  count = count + 1;
                } else if (itemProperty.includes("Item")) {
                  listItemPt[itemProperty.substr(2)] = Object.values(
                    this.state.catalogoPt[0]
                  )[count];
                  count = count + 1;
                }
              });
            } else if (property.includes("ptCategory")) {
              category = Object.values(this.state.catalogoPt[0])[0];
            } else if (property.includes("ptSubCategory")) {
              subCagtegory = Object.values(this.state.catalogoPt[0])[1];
            }
          });
        });

        var subCategoryObj = new Object();
        subCategoryObj[subCagtegory] = listItemPt;

        var myCatalog = new Object();
        myCatalog[category] = subCategoryObj;

        const catalogo = {
          language: "pt",
          myCatalog
        };

        this.props.createMenu(catalogo);
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

  handleChange = e => {
    if (e.target.id.includes("en")) {
      this.setStore(e, "catalogoEn");
    } else if (e.target.id.includes("es")) {
      this.setStore(e, "catalogoEs");
    } else if (e.target.id.includes("pt")) {
      this.setStore(e, "catalogoPt");
    }
  };

  handleCleanForm = () => {};

  handleAddItem = () => {
    this.setState({ countItems: this.state.countItems + 1 });

    const idEn = "enItem" + this.state.countItems;
    const idEs = "esItem" + this.state.countItems;
    const idPt = "ptItem" + this.state.countItems;

    this.setState({ idEn: "" });
    this.setState({ idEs: "" });
    this.setState({ idPt: "" });

    this.displayData.push(
      <div
        key={this.state.countItems}
        id={this.state.countItems}
        className="row"
      >
        <div>
          <div>
            <label style={{ width: 150 + "px", marginBottom: ".9rem" }}>
              Articulo {this.state.countItems}
            </label>
          </div>
        </div>
        <div>
          <div className="input-group">
            <div className="App-Component">
              <div className="App-Component">
                <Autocomplete
                  idInput={idEn}
                  onChange={this.handleChange}
                  value={this.state[idEn]}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="input-group">
            <div className="App-Component">
              <div className="App-Component">
                <Autocomplete
                  idInput={idEs}
                  onChange={this.handleChange}
                  value={this.state[idEs]}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="input-group">
            <div className="App-Component">
              <div className="App-Component">
                <Autocomplete
                  idInput={idPt}
                  onChange={this.handleChange}
                  value={this.state[idPt]}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="input-group">
            <button onClick={this.handleDeleteItem}>Eliminar Item</button>
          </div>
        </div>
      </div>
    );
    this.setState({
      ["newItem"]: this.displayData
    });
  };

  setStore(e, catalogoName) {
    if (this.propertiesEn.length > 0 && e.target.id.includes("en")) {
      Object.values(this.propertiesEn).map(property => {
        Object.keys(property).map(prop => {
          property[e.target.id] = e.target.value;
        });
      });
    } else if (e.target.id.includes("en")) {
      this.propertiesEn.push({ [e.target.id]: e.target.value });
    }

    if (this.propertiesEs.length > 0 && e.target.id.includes("es")) {
      Object.values(this.propertiesEs).map(property => {
        Object.keys(property).map(prop => {
          property[e.target.id] = e.target.value;
        });
      });
    } else if (e.target.id.includes("es")) {
      this.propertiesEs.push({ [e.target.id]: e.target.value });
    }

    if (this.propertiesPt.length > 0 && e.target.id.includes("pt")) {
      Object.values(this.propertiesPt).map(property => {
        Object.keys(property).map(prop => {
          property[e.target.id] = e.target.value;
        });
      });
    } else if (e.target.id.includes("pt")) {
      this.propertiesPt.push({ [e.target.id]: e.target.value });
    }

    this.setState({ [e.target.id]: e.target.value });
    this.setState({
      [catalogoName]:
        catalogoName === "catalogoEn"
          ? this.propertiesEn
          : catalogoName === "catalogoEs"
          ? this.propertiesEs
          : this.propertiesPt
    });
  }

  render() {
    const {
      lang,
      documentsEn,
      documentsEs,
      documentsPt,
      firebase
    } = this.props;

    let list = [];

    if (documentsPt.length === 0) {
      this.props.getDocuments({ firebase, language: "pt" });
    }

    if (documentsEs.length === 0) {
      this.props.getDocuments({ firebase, language: "es" });
    }

    if (documentsEn.length === 0) {
      this.props.getDocuments({ firebase, language: "en" });
    }

    if (
      documentsEn.length > 0 &&
      documentsEs.length > 0 &&
      documentsPt.length > 0
    ) {
      let countId = 1;
      documentsEn.forEach(doc => {
        var obj = new Object();
        var items = Object.keys(
          doc[Object.keys(doc)[0]][Object.keys(doc[Object.keys(doc)[0]])[0]]
        );

        items.forEach(item => {
          obj["id"] = countId;
          obj["Category"] = Object.keys(doc)[0];
          obj["SubCategory"] = Object.keys(doc[Object.keys(doc)[0]])[0];
          obj["Item"] =
            doc[Object.keys(doc)[0]][Object.keys(doc[Object.keys(doc)[0]])[0]][
              item
            ];
          obj["Language"] = "Spanish";
        });
        countId = countId + 1;
        list.push(obj);
      });

      documentsEs.forEach(doc => {
        var obj = new Object();
        var items = Object.keys(
          doc[Object.keys(doc)[0]][Object.keys(doc[Object.keys(doc)[0]])[0]]
        );

        items.forEach(item => {
          obj["id"] = countId;
          obj["Category"] = Object.keys(doc)[0];
          obj["SubCategory"] = Object.keys(doc[Object.keys(doc)[0]])[0];
          obj["Item"] =
            doc[Object.keys(doc)[0]][Object.keys(doc[Object.keys(doc)[0]])[0]][
              item
            ];
          obj["Language"] = "Spanish";
        });
        countId = countId + 1;
        list.push(obj);
      });

      documentsPt.forEach(doc => {
        var obj = new Object();
        var items = Object.keys(
          doc[Object.keys(doc)[0]][Object.keys(doc[Object.keys(doc)[0]])[0]]
        );

        items.forEach(item => {
          obj["id"] = countId;
          obj["Category"] = Object.keys(doc)[0];
          obj["SubCategory"] = Object.keys(doc[Object.keys(doc)[0]])[0];
          obj["Item"] =
            doc[Object.keys(doc)[0]][Object.keys(doc[Object.keys(doc)[0]])[0]][
              item
            ];
          obj["Language"] = "Portugues";
        });
        countId = countId + 1;
        list.push(obj);
      });
    }

    //if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <MyComponent
        lang={lang}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        newItem={this.state.newItem}
        handleAddItem={this.handleAddItem}
        handleDeleteItem={this.handleDeleteItem}
        state={this.state}
        this={this}
        catalogList={list}
      />
    );
  }
}

const mapStateToProps = state => ({
  lang: state.navar.lang,
  auth: state.firebase.auth,
  documentsEn: state.data.documentsEn,
  documentsEs: state.data.documentsEs,
  documentsPt: state.data.documentsPt
});

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    { createMenu, getDocuments }
  )
)(CreateMenu);
