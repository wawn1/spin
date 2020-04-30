import {CHANGE_NAME} from "./constants";

export const defaultState = {
  name: "xmu",
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
};
