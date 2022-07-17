import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { store } from './redux';
import { Provider } from 'react-redux';
import App from './app/app';
import { setupInterceptors } from './setupInterceptors'

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

setupInterceptors(store);
