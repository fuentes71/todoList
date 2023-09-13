import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from "redux-persist"
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './rootReducer'

const persistConfig = {
  key: 'user',
  storage,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)
const store = configureStore({
   reducer: persistedReducer
  
})
const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch

export { persistor, store }

