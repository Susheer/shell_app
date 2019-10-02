import React from "react";
import { Link } from "react-router-dom";
import "./FlatLink.css";

const FlatLink = ({ title, to }) => {
  return (
    <div className="flatLink-container default-theam">
      <Link className="flatLink" to={to}>
        {title}
      </Link>
    </div>
  );
};

export { FlatLink };
