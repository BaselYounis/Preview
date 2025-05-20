import { BaseURL, URLManager } from "../urls";

export class UserAPI {
    private static readonly baseURL = BaseURL + "User/";
    public static readonly URLManager = new URLManager(UserAPI.baseURL);
}


