import React from "react";
import { IconBtn, IconLink } from "./header-component";
const Header = ({ pageTitle }) => {
  return (
    <div className="row-1 headerRow">
      {/*  left area */}
      <div className="headerLeft">
        <IconLink icon="arrow_back" to="/" />
        <IconLink to="/" icon="home" />
      </div>
      {/* center area */}
      <div className="headerCenter">
        <div className="headerTitle">Contests</div>
      </div>
      {/* right area */}
      <div className="headerRight">
        <IconBtn icon="account_balance_wallet" />
      </div>
    </div>
  );
};
export default Header;
