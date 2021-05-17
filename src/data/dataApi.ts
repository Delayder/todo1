import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_INTRO = 'hasSeenIntro';
const USERNAME = 'username';

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_INTRO }),
    Storage.get({ key: USERNAME })]);
  const isLoggedin = await response[0].value === 'true';
  const hasSeenIntro = await response[1].value === 'true';
  const username = await response[2].value || undefined;
  const data = {
    isLoggedin,
    hasSeenIntro,
    username
  }
  return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setHasSeenIntroData = async (hasSeenIntro: boolean) => {
  await Storage.set({ key: HAS_SEEN_INTRO, value: JSON.stringify(hasSeenIntro) });
}

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: USERNAME });
  } else {
    await Storage.set({ key: USERNAME, value: username });
  }
}
