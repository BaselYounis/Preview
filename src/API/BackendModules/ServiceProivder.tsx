import { BaseURL, URLManager } from "../urls";

export class ServiceProviderAPI {
  private static readonly baseUrl = BaseURL + "ServiceProvider/";
  public static readonly URLManager = new URLManager(this.baseUrl);
}
