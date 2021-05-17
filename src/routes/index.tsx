import {  help, logIn, logOut, person, personAdd, home, cash, informationCircle } from 'ionicons/icons';

const routes = {
  appPages: [
    { title: 'Money', path: '/tabs/money', icon: cash },
    { title: 'Home', path: '/tabs/home', icon: home },
    { title: 'About', path: '/tabs/about', icon: informationCircle }
  ],
  loggedInPages: [
    { title: 'Account', path: '/account', icon: person },
    { title: 'Support', path: '/support', icon: help },
    { title: 'Logout', path: '/login', icon: logOut }
  ],
  loggedOutPages: [
    { title: 'Login', path: '/login', icon: logIn },
    { title: 'Support', path: '/support', icon: help },
    { title: 'Signup', path: '/signup', icon: personAdd }
  ]
};

export default routes;
