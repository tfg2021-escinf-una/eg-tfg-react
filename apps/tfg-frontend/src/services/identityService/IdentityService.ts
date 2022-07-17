import { useFetch } from "@eg-tfg/core";
import { ICredentialRequest, ITokenResponse, IRefreshTokenRequest, IRegisterUser } from "../../interfaces";

const identityServiceUrl = process.env['NX_IDENTITY_SERVICE_URL'] || "https://localhost:5000/";

const login = async ({ ...credentials } : ICredentialRequest) : Promise<any> => {
  const { response, errors, statusCode } = await useFetch<ITokenResponse>({
    method: 'POST',
    baseUrl: identityServiceUrl,
    endpoint: '/identity/login',
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
    endpoint: '/identity/refresh',
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
    endpoint: '/identity/register',
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

const getRoles = async() => {
  const { response, errors, statusCode } = await useFetch({
    method: 'GET',
    baseUrl: identityServiceUrl,
    endpoint: '/identity/role',
  })

  return new Map([
    [ "statusCode", statusCode ],
    [ "roles", response ],
    [ "errors", errors ]
  ])
}

export const identityService = {
  login,
  refresh,
  register,
  getRoles
}
