import React from "react";
import { Link } from "react-router-dom";
import "./iconBtn.css";
const IconLink = ({ icon, to }) => {
  return (
    <div className="btn-container theam-default">
      <Link to={to} className="btn btn--icon">
        <div className="align-center">
          <i className="material-icons">{icon}</i>
        </div>
      </Link>
    </div>
  );
};
export { IconLink };
