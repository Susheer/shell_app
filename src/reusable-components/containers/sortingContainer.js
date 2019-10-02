import React from "react";
import "./sortingContainer.css";
const SortingContainer = props => {
  return (
    <>
      <div className="sortingHeader">
        <div className="sortLabel">{props.hTitle}</div>
      </div>

      <div className="sortingBody">{props.children}</div>
    </>
  );
};

export { SortingContainer };
