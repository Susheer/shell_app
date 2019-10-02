import React from "react";
import "./IconButton.css";
import { Link } from "react-router-dom";
const IconLink = ({ title, icon, endPoint }) => {
  return (
    <div className="Icon-Button-container default-theam">
      <Link to={endPoint} className="Icon-button raisedWhiteButtonNew">
        <div className="iconLabel iconLabelSmall">
          <span className="iconContent">{title}</span>
          <i
            className="materialIcon"
            style={{
              height: "14px",
              width: "14px",
              fontSize: "14px",
              marginLeft: "0.5rem"
            }}
          >
            {icon}
          </i>
        </div>
      </Link>
    </div>
  );
};

export { IconLink };
