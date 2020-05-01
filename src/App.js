import React from "react";
import Header from "./components/header";
import {renderRoutes} from "react-router-config";

const App = (props) => {
  return (
    <div>
      <Header />
      {renderRoutes(props.route.routes)}
    </div>
  );
};

export default App;
