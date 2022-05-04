import { ICredentialRequest, ITokenResponse } from "../interfaces";
import { IAPIResponse } from "../interfaces/api/IAPIResponse";

const identityServiceUrl = process.env['identityServiceUrl'] || "https://localhost:5000/";

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
}

export const identityService = {
    login
}