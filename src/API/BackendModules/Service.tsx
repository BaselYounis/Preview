import { BaseURL, URLManager } from "../urls";

export class ServiceAPI {
    private static readonly BaseURL = BaseURL + "Service/";
    
    public static readonly URLManager = new URLManager(ServiceAPI.BaseURL);
}
