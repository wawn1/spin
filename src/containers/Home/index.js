import React, {useEffect} from "react";
import Header from "../../components/header";
import {connect} from "react-redux";
import {getNewName} from "./store/actions";
import {defaultState} from "./store/reducer";

const Home = ({name, _getNewName}) => {
  useEffect(() => {
    if (name === defaultState.name) {
      _getNewName();
    }
  }, []);
  return (
    <div>
      <Header></Header>
      This is Home, name is {name}
      <button onClick={() => alert("click")}>click</button>
    </div>
  );
};

Home.loadData = (store) => {
  return store.dispatch(getNewName(true));
};

const mapStateToProps = (state) => ({
  name: state.home.name,
});

const mapDispatchToProps = (dispatch) => ({
  _getNewName() {
    dispatch(getNewName());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
