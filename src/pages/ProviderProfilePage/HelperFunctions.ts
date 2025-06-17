export type providerData = {
  organization_name: string;
  profile_picture: string | null;
  location: { governorate: string; industrial_zone: string };
  wide_profile_background: string | null;
  created_at: string;
};
export function getProviderData(): providerData | null {
  const cachedData = localStorage.getItem("manpowerSupplierData");
  if (cachedData) {
    return JSON.parse(cachedData);
  } else {
    return null;
  }
}