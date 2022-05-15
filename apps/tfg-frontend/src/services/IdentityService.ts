import { ICredentialRequest,
         ITokenResponse,
         IRefreshTokenRequest } from "../interfaces";
import { IAPIResponse } from "../interfaces/api/IAPIResponse";

const identityServiceUrl = process.env['IDENTITY_SERVICE_URL'] || "https://localhost:5000/";

const login = ({ ...credentials } : ICredentialRequest) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      emailAddress: credentials.emailAddress,
      password: credentials.password
    })
  }

  return fetch(`${identityServiceUrl}/identity/login`, requestOptions)
    .then((response) => response.json())
    .then((fetchedData : IAPIResponse<ITokenResponse>) =>{
      return fetchedData;
    });
};

const refresh = ({ ...tokens } : IRefreshTokenRequest) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jwtToken: tokens.jwtToken,
      refreshToken: tokens.refreshToken
    })
  }

  return fetch(`${identityServiceUrl}/identity/refresh`, requestOptions)
    .then((response) => response.json())
    .then((fetchedData : IAPIResponse<ITokenResponse>) => {
      return fetchedData;
    })
}

export const identityService = {
  login,
  refresh
}
