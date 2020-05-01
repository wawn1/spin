import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/home">Home Link</Link> <br />
      <Link to="/login">Login Link</Link>
    </div>
  );
};

export default Header;
