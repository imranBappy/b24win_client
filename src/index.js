import Axios from 'axios';
import jwt_decide from 'jwt-decode';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import * as Types from './store/actions/types';
import store from './store/store';
import setAuthToken from './utils/setAuthHeader';

const token = localStorage.getItem('token');

      
if (token) {
    store.dispatch({
      type: Types.SET_USER,
      payload:{
        auth: true,
        user:{},
        token
      }
    })
    const decode = jwt_decide(token);
    Axios.get(`https://b24win.herokuapp.com/user/single-user/${decode._id}`,{
      	headers:{
          authorization: token
        }
    }).then((res)=>{
      if (res.data.error) {
        localStorage.removeItem('token')
        store.dispatch({
          type: Types.SET_USER,
          payload:{
            auth: false,
            user: {},
            token: ''
          }
        })
      }else{
        store.dispatch({
          type: Types.SET_USER,
          payload:{
            auth: true,
            user: res.data.data.length ? res.data.data[0] : {},
            token
          }
        })
      }
      
    })
}else{
        store.dispatch({
          type: Types.SET_USER,
          payload:{
            auth: false,
            user: {},
            token: ''
          }
        })
}
setAuthToken(token);
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store} >
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
