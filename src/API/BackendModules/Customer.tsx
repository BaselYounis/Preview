import { BaseURL, URLManager } from "../urls";

export class CustomerService {
    private static readonly baseURL = BaseURL + "Customer/";
    public static readonly URLManager = new URLManager(CustomerService.baseURL);
}
