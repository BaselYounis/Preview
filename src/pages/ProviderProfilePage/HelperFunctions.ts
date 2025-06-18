import { ManpowerSupplierAPI } from "../../API/BackendModules/ManpowerSupplier";

export type providerData = {
  organization_name: string;
  profile_picture: string | null;
  location: { governorate: string; industrial_zone: string };
  wide_profile_background: string | null;
  created_at: string;
  description: string;
};
export function getProviderData(): providerData | null {
  const cachedData = localStorage.getItem("manpowerSupplierData");
  if (cachedData) {
    return JSON.parse(cachedData);
  } else {
    return null;
  }
}

export function updateProviderData<K extends keyof providerData>(
  field: K,
  value: providerData[K]
): void {
  const providerData = getProviderData();
  if (providerData) {
    const updatedData = {
      ...providerData,
      [field]: value,
    };
    localStorage.setItem(ManpowerSupplierAPI.CacheAddress, JSON.stringify(updatedData));
  }
}