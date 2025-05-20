import { ACCESS_TOKEN, HitBackend, REFRESH_TOKEN } from "../Communication";
import { BaseURL, TokenObtainURL, URLManager } from "../urls";

export class UserAPI {
  private static readonly baseURL = BaseURL + "User/";
  public static readonly URLManager = new URLManager(UserAPI.baseURL);

  public static async Login(email: string, password: string) {
    const response = await HitBackend({
      url: TokenObtainURL,
      method: "POST",
      data: { email, password }, // Modern object shorthand
    });

    if (response.success) {
      const { access: accessToken, refresh: refreshToken } = response.data;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
    }

    return response;
  }
}
