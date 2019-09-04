import React from "react";
import moment from "moment";
import photo from "../../../src/images/photo.svg";

const Notifications = props => {
  const { notifications } = props;
  return (
    <div className="section">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="card z-depth-0">
        <div className="card-content">
          <div className="card-title">Notifications</div>
          <ul className="notifications">
            {notifications &&
              notifications.map(notification => {
                return (
                  <li key={notification.id} className="item-notification">
                    <img src={photo}/>
                    <div className="notification-text">
                      <span  className="user-notification">{notification.user} </span>
                      <span className="content-notification">{notification.content}</span>
                      <span className="date-notification">{moment(notification.time.toDate()).fromNow()}</span>
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
