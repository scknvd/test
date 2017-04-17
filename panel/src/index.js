import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { get } from './components/Net'
import apis from './api'

const store = createStore(
	reducer,
	applyMiddleware(logger, thunk)
)

store.dispatch(dispatch => {
  Promise.all(
		apis.map(path => get(path))
	).then(res => {
		let payload = {};

		apis.forEach((apiPath,index) => {
			payload[apiPath] = res[index].data;
		})

		dispatch({
			type:'INIT',
			payload
		})
	})
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
