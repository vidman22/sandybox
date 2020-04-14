import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers/reducers';

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: []
};
const persistedReducer = persistReducer(persistConfig, reducers);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(persistedReducer);

let persistor = persistStore(store);

export default store;