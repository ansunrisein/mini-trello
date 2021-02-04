import {createStore} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {TAction, TBoardState} from './types'
import {reducer} from './reducer'

const persistConfig = {
  key: 'board',
  storage,
}

const persistedReducer = persistReducer<TBoardState, TAction>(persistConfig, reducer)

export const createStoreWithPersistor = (): {store: any; persistor: any} => {
  const store = createStore(persistedReducer)
  const persistor = persistStore(store as any)
  return {store, persistor}
}
