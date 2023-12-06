import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import { getTotals } from './redux/slices/cartSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
store.dispatch(getTotals())
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover={false}
        theme="dark"
      />
      <App />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// Redux Toolkit bao gồm các thành phần sau:

// createStore: Tạo một cửa hàng Redux.
// createAction: Tạo một hành động Redux.
// createReducer: Tạo một bộ giảm thiểu Redux.
// useSelector: Lấy dữ liệu từ cửa hàng Redux trong thành phần React.
// useDispatch: Gửi hành động đến cửa hàng Redux trong thành phần React.