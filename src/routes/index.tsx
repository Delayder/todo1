import {  help, logIn, logOut, person, personAdd, home, cash, informationCircle } from 'ionicons/icons';

const routes = {
  appPages: [
    { title: 'sendMoney', path: '/tabs/sendMoney', icon: cash },
    { title: 'Home', path: '/tabs/home', icon: home },
    { title: 'About', path: '/tabs/about', icon: informationCircle }
  ],
  loggedInPages: [
    { title: 'Account', path: '/account', icon: person },
    { title: 'Logout', path: '/login', icon: logOut }
  ]
};

export default routes;
