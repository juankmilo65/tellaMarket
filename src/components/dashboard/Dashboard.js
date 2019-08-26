import React, { Component } from "react";
import Notifications from "./Notification";
import ItemList from "../items/list/itemtList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Carrusel from "../commons/carusel/carrusel";

class Dashboard extends Component {
  render() {
    const { items, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div>
        <div>
          <div>
            <Carrusel main={true} />
          </div>
          <br />
          <br />
          <div>
            <Carrusel main={false} />
          </div>
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
