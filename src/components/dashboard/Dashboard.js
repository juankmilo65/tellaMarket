import React, { Component } from "react";
import Notifications from "./Notification";
import ItemList from "../items/list/itemtList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Carousel from "../commons/carousel/carousel";
import CarouselMultiple from "../commons/carousel/carouselMultiple";
import ejemplo from "../commons/carousel/ejemplo.jpg";

class Dashboard extends Component {
  render() {
    const { items, auth, notifications } = this.props;
    const imagesMainBar = [
      { image: ejemplo, text: "Texto Ejemplo 1" },
      {
        image: ejemplo,
        text: "Texto Ejemplo 2"
      },
      {
        image: ejemplo,
        text: "Texto Ejemplo 3"
        //Mas propiedades
      }
      //, { mas imagenes}
    ];

    const imagesMultiBar = [
      [
        {
          image: ejemplo,
          text: "Primer texto Ejemplo 1" //Mas propiedades
        },
        { image: ejemplo, text: "Segundo texto Ejemplo 1" },
        { image: ejemplo, text: "Tercero texto Ejemplo 1" }
      ],
      [
        { image: ejemplo, text: "Primer texto Ejemplo 2" },
        { image: ejemplo, text: "Segundo texto Ejemplo 2" },
        { image: ejemplo, text: "Tercero texto Ejemplo 2" }
      ],
      [
        { image: ejemplo, text: "Primer texto Ejemplo 3" },
        { image: ejemplo, text: "Segundo texto Ejemplo 3" },
        { image: ejemplo, text: "Tercero texto Ejemplo 3" }
      ],
      [
        { image: ejemplo, text: "Primer texto Ejemplo 4" },
        { image: ejemplo, text: "Segundo texto Ejemplo 4" },
        { image: ejemplo, text: "Tercero texto Ejemplo 4" }
      ]
    ];
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div>
        <div>
          <div>
            <Carousel images={imagesMainBar} />
            <br />
            <br />
            <br />
            <CarouselMultiple images={imagesMultiBar} />
          </div>
          <div></div>
          <div>
            <ItemList items={items} />
          </div>
          <div>
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.firestore.ordered.items,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    profile: state.firebase.profile
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "items", orderBy: ["createAt", "desc"] },
    { collection: "notifications", limit: 3, orderBy: ["time", "desc"] }
  ])
)(Dashboard);
