import { ADD_SONGS, DELETE_SONG } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_SONGS: {
      return [...state, ...action.payload];
    }
    case DELETE_SONG: {
      return state.filter((song, index) => index !== action.payload);
    }
    default: {
      return state;
    }
  }
};