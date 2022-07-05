import fetchIntercept from 'fetch-intercept'
import fetchBuilder from 'fetch-retry-ts';
import { AppDispatch, refresh, refreshTrigger } from './redux';
import { ISessionState } from './redux/reducers';
import { Store } from 'redux';

export const setupInterceptors = (store : Store) => {
  fetchIntercept.register({
    request: (url, config) => {
      const sessionReducer : ISessionState = store.getState().sessionReducer;
      const { identity }  = sessionReducer
      const { tokens } = identity
      const headers = { ...config.headers,
        "Authorization" : `Bearer ${tokens?.jwtToken}`
      }
      config.headers = headers;
      return [url, config];
    },
  });

  const fetch = fetchBuilder(window.fetch,  {
    retries: 3,
    retryDelay: 3000,
    retryOn:  (attempt: number, retries: number, error: Error | null, response: Response | null) : boolean => {
      if(response?.status === 401) {
        const dispatch : AppDispatch = store.dispatch
        const sessionReducer : ISessionState  = store.getState().sessionReducer
        const { identity }  = sessionReducer
        const { tokens  } = identity
        if(tokens?.jwtToken && tokens?.refreshToken){
          dispatch(refresh({
            jwtToken: tokens.jwtToken,
            refreshToken: tokens.refreshToken
          }))
        }
      }
      return attempt < retries && (!!error || !response || response.status == 401)
    },
  });
  window.fetch = fetch;
}

