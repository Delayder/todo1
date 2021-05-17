import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

export const createTokenProvider = () => {
  let _token: any = localStorage.getItem("TOKEN_AUTH");

  const getToken = async () => {
    if (!_token) {
      return null;
    }

    return _token && _token.accessToken;
  };

  const isLoggedIn = () => {
    return !!_token;
  };

  const subscribe = (observer: (isLogged: boolean) => void) => {
    observers.push(observer);
  };

  const unsubscribe = (observer: (isLogged: boolean) => void) => {
    observers = observers.filter((_observer) => _observer !== observer);
  };

  const notify = () => {
    const isLogged = isLoggedIn();
    observers.forEach((observer) => observer(isLogged));
  };

  const setToken = (token: typeof _token) => {
    if (token) {
      Storage.set({ key: "TOKEN_AUTH", value: JSON.stringify(token) });
    } else {
      Storage.remove({ key: "TOKEN_AUTH" });
    }
    _token = token;
    notify();
  };

  let observers: Array<(isLogged: boolean) => void> = [];
  return {
    getToken,
    isLoggedIn,
    setToken,
    subscribe,
    unsubscribe,
  };
};
