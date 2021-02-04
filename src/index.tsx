import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {createStoreWithPersistor} from '@mt/store'
import './index.css'
import {App} from './App'
import reportWebVitals from './reportWebVitals'

const {store, persistor} = createStoreWithPersistor()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
