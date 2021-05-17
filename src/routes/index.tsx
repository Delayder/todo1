import { person, home, cash, informationCircle } from 'ionicons/icons';

const routes = {
  appPages: [
    { title: 'Cartera', path: '/tabs/sendMoney', icon: cash },
    { title: 'Home', path: '/tabs/home', icon: home },
    { title: 'Sobre Nosotros', path: '/tabs/about', icon: informationCircle }
  ],
  loggedInPages: [
    { title: 'Cuenta', path: '/account', icon: person }
  ]
};

export default routes;
