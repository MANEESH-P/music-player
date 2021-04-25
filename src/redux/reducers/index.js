import { combineReducers } from 'redux';
import songs from './songReducer';
import player from './playerReducer';
const reducers = combineReducers({
  songs,
  player,
});

export default reducers;