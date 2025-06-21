import { ManpowerSupplierAPI } from "../../API/BackendModules/ManpowerSupplier";
import { industrialCategories } from "../../Constants/industrialCategories";

export type MainCategory = keyof typeof industrialCategories;
export type SubCategory = {
  [K in keyof typeof industrialCategories]: typeof industrialCategories[K]['subcategories'][number]
}[keyof typeof industrialCategories];
export type providerData = {
  organization_name: string;
  profile_picture: string | null;
  location: { governorate: string; industrial_zone: string };
  wide_profile_background: string | null;
  created_at: string;
  description: string;
};

export type serviceData = {
  pay_rate?: number;
  main_category?: MainCategory;
  sub_category?: SubCategory;
  description?: string;
  on_site?: boolean;
  is_active?: boolean;
  available_on?:Date
};




export function getProviderData(): providerData | null {
  const cachedData = localStorage.getItem(ManpowerSupplierAPI.CacheAddress);
  // console.log("Cached Provider Data: ", cachedData);
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
  console.log("Updating Provider Data: ", field, value);
  if (providerData) {
    const updatedData = {
      ...providerData,
      [field]: value,
    };
    localStorage.setItem(ManpowerSupplierAPI.CacheAddress, JSON.stringify(updatedData));
  }
}