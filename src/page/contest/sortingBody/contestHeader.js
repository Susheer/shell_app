import React from "react";
import "./contestHeader.css";
import {
  IconButton,
  IconLink,
  FlatLink
} from "../../../reusable-components/button";
import {
  SortingContainer,
  EdgeBox
} from "../../../reusable-components/containers";
const ContestHeader = () => {
  return (
    <div style={{ padding: " 12px", borderBottom: "1px solid #dcdcdc" }}>
      <EdgeBox>
        <IconButton title="Enter Contest Code" icon="input" />
        <IconLink
          title="Create Contest"
          icon="add_circle_outline"
          endPoint="#"
        />
      </EdgeBox>
      {/* sort by start here ----------------*/}

      <SortingContainer hTitle={"Sort By :"}>
        <FlatLink
          title="Entry Fee"
          to="/cricket/contests/cpl-t20/1157/15885?sortBy=0"
        />

        <FlatLink
          title="Contest Size"
          to="/cricket/contests/cpl-t20/1157/15885?sortBy=0"
        />
      </SortingContainer>
    </div>
  );
};
export default ContestHeader;
