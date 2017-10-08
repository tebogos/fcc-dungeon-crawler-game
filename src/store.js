import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk  from 'redux-thunk';
import score from './reducers/score';
import coodinates from './reducers/coodinates';
import message from './reducers/message';
import {composeWithDevTools} from 'redux-devtools-extension';

const reducer=combineReducers({coodinates,message,score});

export default createStore(reducer,
composeWithDevTools(applyMiddleware(thunk))
)
