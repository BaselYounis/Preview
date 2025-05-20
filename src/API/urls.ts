const DEV_MODE = import.meta.env.MODE === "development"

// Access environment variables with import.meta.env
export const ServerURL = DEV_MODE 
  ? import.meta.env.VITE_LOCAL_URL 
  : import.meta.env.VITE_PROD_URL
export const BaseURL = ServerURL + "api/"
export const RefreshTokenURL = BaseURL+"Token/Refresh/"
export const TokenObtainURL = BaseURL + "Token/Obtain/"

export const CRUD = {
    CREATE: "Create/",
    READ: "Read/",
    UPDATE: "Update/",
    DELETE: "Delete/"
} as const;
export class URLManager{
    BaseURL:string;
    constructor(baseURL:string){
        this.BaseURL = baseURL
    }   
    getURL(crud: typeof CRUD[keyof typeof CRUD], extra:string =""){
        return `${this.BaseURL}${crud}${extra}`
    }

}