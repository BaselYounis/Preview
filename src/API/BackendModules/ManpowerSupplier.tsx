import { BaseURL, URLManager } from "../urls";

export class ManpowerSupplierAPI {
  private static readonly BaseURL = BaseURL + "ManpowerSupplier/";
  public static readonly CacheAddress = "manpowerSupplierData";
  public static readonly CacheExpiry = 1 * 60 * 1000; // 1 minute in milliseconds
  public static readonly CacheTimestampAddress =
    "manpowerSupplierDataTimestamp";
  public static readonly URLManager = new URLManager(
    ManpowerSupplierAPI.BaseURL
  );
}
