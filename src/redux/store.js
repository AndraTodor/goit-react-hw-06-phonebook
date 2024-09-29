import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import contactsReducer from './contactsSlice';

// Configurația pentru redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

// Combinarea reducerilor
const rootReducer = combineReducers({
  contacts: contactsReducer,
});

// Aplicarea persistReducer pentru persistența stării
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configurarea store-ului cu middleware pentru dezactivarea serializării
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorăm acțiunile legate de redux-persist (persist/rehydrate etc.)
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Crearea persistorului pentru a controla persistența
const persistor = persistStore(store);

export { store, persistor };
