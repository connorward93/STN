/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import channelReducer from './components/live/channelSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    channels: channelReducer,
  });
}
