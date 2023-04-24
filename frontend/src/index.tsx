import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './reset.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ConnectionProvider } from './Components/Controls/Connection/ConnectionProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<App />
	</Provider>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);
