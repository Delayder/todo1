import { Plugins } from "@capacitor/core";
import { useEffect, useState } from "react";
import { createTokenProvider } from "./user.token";

const { Storage } = Plugins;

const HAS_LOGGED_IN = "hasLoggedIn";
const HAS_SEEN_INTRO = "hasSeenIntro";
const USERNAME = "username";

const createAuthProvider = () => {
  const tokenProvider = createTokenProvider();

  const generateLogin: typeof tokenProvider.setToken = (token) => {
    tokenProvider.setToken(token);
  };

  const logout = async () => {
    tokenProvider.setToken({ accessToken: "" });
    await Storage.remove({ key: USERNAME });
  };

  const authFetch = async (
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response> => {
    const token = await tokenProvider.getToken();

    init = init || {};

    init.headers = {
      ...init.headers,
      Authorization: `Bearer ${token}`,
    };

    return fetch(input, init);
  };

  const useAuth = () => {
    const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());

    useEffect(() => {
      const listener = (newIsLogged: boolean) => {
        setIsLogged(newIsLogged);
      };

      tokenProvider.subscribe(listener);
      return () => {
        tokenProvider.unsubscribe(listener);
      };
    }, []);

    return [isLogged] as [typeof isLogged];
  };

  const getUserData = async () => {
    const response = await Promise.all([
      Storage.get({ key: HAS_LOGGED_IN }),
      Storage.get({ key: HAS_SEEN_INTRO }),
      Storage.get({ key: USERNAME }),
    ]);
    const isLoggedin = (response[0].value) === "true";
    const hasSeenIntro = (response[1].value) === "true";
    const username = (response[2].value) || undefined;
    const data = {
      isLoggedin,
      hasSeenIntro,
      username,
    };
    return data;
  };

  const setIsLoggedInData = async (isLoggedIn: boolean) => {
    await Storage.set({
      key: HAS_LOGGED_IN,
      value: JSON.stringify(isLoggedIn),
    });
  };

  const setHasSeenIntroData = async (hasSeenIntro: boolean) => {
    await Storage.set({
      key: HAS_SEEN_INTRO,
      value: JSON.stringify(hasSeenIntro),
    });
  };

  const setUsernameData = async (username?: string) => {
    if (!username) {
      await Storage.remove({ key: USERNAME });
    } else {
      await Storage.set({ key: USERNAME, value: username });
    }
  };

  return {
    useAuth,
    authFetch,
    generateLogin,
    logout,
    getUserData,
    setIsLoggedInData,
    setHasSeenIntroData,
    setUsernameData,
  };
};

export const {
  useAuth,
  authFetch,
  generateLogin,
  logout,
  getUserData,
  setIsLoggedInData,
  setHasSeenIntroData,
  setUsernameData,
} = createAuthProvider();
