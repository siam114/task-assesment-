"use client";

import { UserTokenDataType } from "@/types/common";
import { parseJwt } from "./jwt";
import Cookies from "js-cookie";

const auth = {
  saveToken: (token: string, remember = false) => {
    Cookies.set("access_token", token, {
      expires: remember ? 1 : 1 / 48, // 1 day or 30 min
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  saveRefreshToken: (token: string, remember = false) => {
    Cookies.set("refresh_token", token, {
      expires: 15, // 15 day
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  getToken: (): string | undefined => {
    return Cookies.get("access_token");
  },

  getRefreshToken: (): string | undefined => {
    return Cookies.get("refresh_token");
  },

  logout: async () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    return 1;
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get("access_token");
  },

  getUserData: (accessToken?: string): UserTokenDataType | null => {
    const token = !!accessToken ? accessToken : Cookies.get("access_token");
    let userInfo = null;
    if (token) {
      userInfo = parseJwt(token) || null;
    }

    return userInfo;
  },
};

export default auth;
