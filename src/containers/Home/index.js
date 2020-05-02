import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getNewName} from "./store/actions";
import {defaultState} from "./store/reducer";
import styles from "./style.css";

const Home = ({staticContext, name, _getNewName}) => {
  staticContext && staticContext.css.push(styles._getCss());
  useEffect(() => {
    if (name === defaultState.name) {
      _getNewName();
    }
  }, []);
  return (
    <div className={styles.test}>
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
