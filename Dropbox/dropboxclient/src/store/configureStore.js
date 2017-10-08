import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist'
import { asyncSessionStorage } from 'redux-persist/storages'

export default function configureStore(initialState){
	 let store = createStore(
		 rootReducer,
		 initialState,
		 compose(
		   applyMiddleware(thunk),
		   window.devToolsExtension ? window.devToolsExtension() : f => f
		 )
		);
	persistStore(store, {storage: asyncSessionStorage});

	return store;
}