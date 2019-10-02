import React from "react";
import "./IconButton.css";
const IconButton = ({ title, icon }) => {
  return (
    <div className="Icon-Button-container default-theam">
      <button className="Icon-button raisedWhiteButtonNew">
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
      </button>
    </div>
  );
};

export { IconButton };
