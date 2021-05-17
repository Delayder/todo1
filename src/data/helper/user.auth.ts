import react, { useEffect, useState } from "react";
import { createTokenProvider } from "./user.token";

const createAuthProvider = () => {
  const tokenProvider = createTokenProvider();

  const generateLogin: typeof tokenProvider.setToken = (token) => {
    tokenProvider.setToken(token);
  };

  const logout = () => {
    tokenProvider.setToken({ accessToken: "" });

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
  return {
    useAuth,
    authFetch,
    generateLogin,
    logout,
  };
};

export const {useAuth, authFetch, generateLogin, logout} = createAuthProvider();
