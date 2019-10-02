import React from "react";
import "./iconBtn.css";
const IconBtn = ({ icon }) => {
  return (
    <div className="btn-container theam-default">
      <button className="btn btn--icon">
        <div className="align-center">
          <i className="material-icons">{icon}</i>
        </div>
      </button>
    </div>
  );
};
export { IconBtn };
