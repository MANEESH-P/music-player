import { SET_DARK_THEME } from '../actions';

const initalState = {
  theme: 'dark'
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_DARK_THEME: {
      return { ...state, theme: action.payload };
    }
    default: {
      return state;
    }
  }
};