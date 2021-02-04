import {createStore} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {TBoardAction, TBoardState} from '@mt/types'
import {reducer} from './reducer'

const persistConfig = {
  key: 'board',
  storage,
}

const persistedReducer = persistReducer<TBoardState, TBoardAction>(persistConfig, reducer)

export const createStoreWithPersistor = (): {store: any; persistor: any} => {
  const store = createStore(persistedReducer)
  const persistor = persistStore(store as any)
  return {store, persistor}
}
