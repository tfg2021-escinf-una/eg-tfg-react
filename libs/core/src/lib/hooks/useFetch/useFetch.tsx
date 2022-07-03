import { useSelector } from 'react-redux';

export interface IFetchConfig {
  method: 'POST' | 'GET' | 'PUT' | "DELETE",
  authenticate? : boolean
  baseUrl : string,
  endpoint : string,
  options?: RequestInit
}

export interface IFetchResponse<T> {
  url : string,
  statusCode : number,
  response? : T,
  errors?: string | unknown
}

const safeUrls = (url: string) => {
  let newUrl : string = url;
  let regFinExpr = /[/!@#\\$%\\^\\&*\\)\\(+=._-]$/
  let regStartExpr = /^[/]/;

  // Sanitizing the urls

  newUrl = url.replace(regFinExpr, "");
  newUrl = newUrl.replace(regStartExpr, "");

  return newUrl;
}

export const useFetch = async <T extends Object> ({
  baseUrl,
  authenticate = false,
  endpoint,
  method,
  options = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    }
  }
} : IFetchConfig) : Promise<any> => {
  let sanitizedBaseUrl = safeUrls(baseUrl);
  let sanitizedEndpoint = safeUrls(endpoint);
  let objReturn : IFetchResponse<T> = {
    url: `${sanitizedBaseUrl}/${sanitizedEndpoint}`,
    statusCode: 0
  }

  try {
    if(authenticate){
      const { identity } = useSelector((state : any) => state.sessionReducer);
      options.headers = {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${identity?.tokens?.jwtToken}`
      }
    }

    let fetchData = await fetch(`${sanitizedBaseUrl}/${sanitizedEndpoint}`, {
      ...options
    })

    if(!fetchData.ok){
      return { ...objReturn,
        response : {} as T,
        statusCode: fetchData.status,
        errors: fetchData.statusText
      }
    }

    let fetchedData = await fetchData.json();

    objReturn = { ...objReturn,
      response: fetchedData,
      errors: "",
      statusCode: fetchData.status
    }
  }
  catch(err : any){
    objReturn = { ...objReturn,
      response: {} as T,
      errors: err?.message,
      statusCode : 503
    }
  }

  return objReturn;
}
