import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
import "../detail/itemDetail.scss";

const ProjectDetail = props => {
  const { item } = props;

  if (item) {
    return (
      <div className="container section project-details">
        <div className="card">
          <div className="card-content">
            <span className="card-title">Item Title - {item.title}</span>
            <p>{item.content}</p>
          </div>
          <div className="card-action">
            <div>
              Posted by {item.ownerName} {item.ownerLastName}
            </div>
            <div>{moment(item.createAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading project....</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const items = state.firestore.data.items;
  const item = items ? items[id] : null;
  return {
    item: item,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "items"
    }
  ])
)(ProjectDetail);
