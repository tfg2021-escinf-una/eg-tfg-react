import { useFetch } from "@eg-tfg/core";
import { ICredentialRequest, ITokenResponse, IRefreshTokenRequest, IRegisterUser } from "../../interfaces";

const identityServiceUrl = process.env['NX_IDENTITY_SERVICE_URL'] || "https://localhost:5000/";

const login = async ({ ...credentials } : ICredentialRequest) : Promise<any> => {
  const { response, errors, statusCode } = await useFetch<ITokenResponse>({
    method: 'POST',
    baseUrl: identityServiceUrl,
    endpoint: '/user/login',
    options: {
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body : JSON.stringify({ ...credentials })
    }
  })

  return new Map<string, unknown>([
    [ "statusCode", statusCode ],
    [ "identity", response ],
    [ "errors", errors ]
  ])
};

const refresh = async ({ ...tokens } : IRefreshTokenRequest) => {
  const { response, errors, statusCode } = await useFetch<IRefreshTokenRequest>({
    method: 'POST',
    baseUrl: identityServiceUrl,
    endpoint: '/user/refresh',
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jwtToken: tokens.jwtToken,
        refreshToken: tokens.refreshToken
      })
    }
  })

  return new Map<string, unknown>([
    [ "statusCode", statusCode ],
    [ "tokens", response ],
    [ "errors", errors ]
  ])
}

const register = async ({ ...user} : IRegisterUser) : Promise<any> => {
  const { response, errors, statusCode } = await useFetch<IRegisterUser>({
    method: 'POST',
    baseUrl: identityServiceUrl,
    endpoint: '/user/register',
    options: {
      body : JSON.stringify({ ...user })
    }
  })

  return new Map([
    [ "statusCode", statusCode ],
    [ "response", response ],
    [ "errors", errors ]
  ])
}

export const identityService = {
  login,
  refresh,
  register
}
