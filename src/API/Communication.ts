
import axios, { isAxiosError, type AxiosInstance } from "axios";
import {jwtDecode} from "jwt-decode";
import { BaseURL, RefreshTokenURL } from "./urls.ts";
export const ACCESS_TOKEN="access"
export const REFRESH_TOKEN="refresh"
export async function refreshAccessToken():Promise<string|null>{
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if(!refreshToken)
        return null
    try{
        const response = await axios.post(RefreshTokenURL,{"refresh":refreshToken})
        if(response.status===200){
            const newAccessToken = response.data.access
            localStorage.setItem(ACCESS_TOKEN,newAccessToken)
            return newAccessToken
        }
        else
        return null
    }
    catch(e){
        if(isAxiosError(e) && e.response)
            console.log(e.response.data)
        return null
    }

}
export async function  getFreshAccessToken():Promise<string|null>{
    const token = localStorage.getItem(ACCESS_TOKEN);
    if(!token)
        return null
    const decodedToken = jwtDecode(token)
    const expDate = decodedToken.exp
    if(!expDate)
        return null
    const now = Date.now()/1000
    if(expDate<now){
       return refreshAccessToken()
    }
    return token

}
export const authAPI = axios.create({
    baseURL: BaseURL
});

export const API = axios.create({
    baseURL: BaseURL,
})

authAPI.interceptors.request.use(async (config) => {
    const token = await getFreshAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},

(error)=>{
    return Promise.reject(error);
},

);
export default authAPI


export type SendToBackendParams={
    
    url:string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?:any,
    method:"POST"|"GET"|"PUT"|"DELETE"
}
export type SendToBackendRetrnType = {
    success: boolean;
    message?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
}

export async function SendToBackend(api:AxiosInstance,{ url, data, method = "POST" }: SendToBackendParams): Promise<SendToBackendRetrnType> {

    try {
        let response;
        if (method === "POST") {
            response = await api.post(url, data);
        } else if (method === "GET") {
            response = await api.get(url, { params: data });
        } else if (method === "PUT") {
            response = await api.put(url, data);
        } else if (method === "DELETE") {
            response = await api.delete(url, { params: data });
        } else {
            throw new Error("Invalid method");
        }
        return { success: true, data: response.data };
    } catch (error) {
        console.error("API request failed:", error);
        
        if (isAxiosError(error)) {
            const statusCode = error.response?.status;
            if(statusCode){
                if (statusCode === 401) { //unauthorized
                    return { success: false, message: "Unauthorized access", data: error.response?.data };
                } 
                else if (statusCode === 400) {

                    // Handle bad request
                    let message:string="";
                    
                    if(error.response){
                        for(const [key,value] of Object.entries(error.response.data)){
                            message += `${key}: ${value}\n`;
                        }
                    }
                    else {
                        message = "Bad request";
                    }
                    return { success: false, message: message, data: error.response?.data };


                } else if (statusCode === 403) {
                    return { success: false, message: "Forbidden", data: error.response?.data };
                }
            }
        }
        
        // Non-Axios errors
        return { 
            success: false, 
            message: "Unknown error occurred", 
            data: error 
        };
    }

}

export async function HitBackend({ url, data, method = "GET" }: SendToBackendParams): Promise<SendToBackendRetrnType> {
    return await SendToBackend(API,{url,data,method});
    
}

export async function HitAuthBackend({ url, data, method = "GET" }: SendToBackendParams): Promise<SendToBackendRetrnType> {
    return await SendToBackend(authAPI,{url,data,method});
}