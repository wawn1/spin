import React from "react";

const NotFound = ({staticContext}) => {
  staticContext && (staticContext.NOT_FOUND = true);

  return <div>404 NOT FOUND</div>;
};

export default NotFound;
