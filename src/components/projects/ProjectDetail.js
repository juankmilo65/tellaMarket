import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const ProjectDetail = props => {
  const { item } = props;
  if (item) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">Project Title - {item.title}</span>
            <p>{item.content}</p>
          </div>
          <div className="card-action gret lighten-4 grey-text">
            <div>
              Posted by {item.ownerName} {item.ownerLastName}
            </div>
            <div>2nd Sept 2019</div>
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
    item: item
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
