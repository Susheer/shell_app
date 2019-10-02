import React from "react";
import "./FlatButton.css";

const FlatButton = ({ title }) => {
  return (
    <div className="flatButton-container default-theam">
      <button className="flatButton">{title}</button>
    </div>
  );
};

export { FlatButton };
