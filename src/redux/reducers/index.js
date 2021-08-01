import { combineReducers } from 'redux';
import songs from './songReducer';
import player from './playerReducer';
import theme from './themeReducer';

const reducers = combineReducers({
  songs,
  player,
  theme
});

export default reducers;