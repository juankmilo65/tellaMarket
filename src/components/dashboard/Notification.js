import React from "react";
import moment from "moment";
import photo from "../../../src/images/photo.svg";

const Notifications = props => {
  const { notifications } = props;
  return (
    <div className="section">
      <div className="card inactive">
        {" "}
        {/*Poner clase inactive para ocultar la notification */}
        <div className="card-content">
          <div className="card-title">
            <span className="d-flex align-items-center">
              Notifications <span className="number-notification">10</span>
            </span>
            <i className="material-icons">close</i>{" "}
          </div>
          <ul className="notifications">
            {notifications &&
              notifications.map(notification => {
                return (
                  <li key={notification.id} className="item-notification">
                    <img src={photo} />
                    <div className="notification-text">
                      <span className="user-notification">
                        {notification.user}{" "}
                      </span>
                      <span className="content-notification">
                        {notification.content}
                      </span>
                      <span className="date-notification">
                        {moment(notification.time.toDate()).fromNow()}
                      </span>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
