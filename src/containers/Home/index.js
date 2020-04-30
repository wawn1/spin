import React from "react";
import Header from "../../components/header";

const Home = () => {
  return (
    <div>
      <Header></Header>
      This is Home
      <button onClick={() => alert("click")}>click</button>
    </div>
  );
};

export default Home;
