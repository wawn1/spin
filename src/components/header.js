import React from "react";
import {Link} from "react-router-dom";
import styles from "./style.css";

const Header = ({staticContext}) => {
  staticContext && staticContext.css.push(styles._getCss());
  return (
    <div className={styles.test}>
      <Link to="/home">Home Link</Link> <br />
      <Link to="/login">Login Link</Link>
    </div>
  );
};

export default Header;
