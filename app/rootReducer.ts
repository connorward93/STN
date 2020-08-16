/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import playerReducer from './components/common/playerSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    player: playerReducer,
  });
}
