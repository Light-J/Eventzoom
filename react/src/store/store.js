import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import rootReducer from './reducers/rootReducer';
// reference: https://medium.com/backticks-tildes/setting-up-a-redux-project-with-create-react-app-e363ab2329b8
// accessed 1/11/2019
export default function configureStore(initialState = {}) {
	return createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(thunk)),
	);
}
