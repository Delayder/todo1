import React from 'react';
import { RouteComponentProps, withRouter, useLocation } from 'react-router';

import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonToggle, useIonViewWillEnter } from '@ionic/react';
import {  hammer, moonOutline, help, logIn, logOut, person, personAdd, home, cash, informationCircle } from 'ionicons/icons';

import { connect } from '../../../data/connect';
import { setDarkMode } from '../../../data/user/user.actions';

import './Menu.css';
import { setMenuEnabled } from '../../../data/sessions/sessions.actions';

const routes = {
  appPages: [
    { title: 'Money', path: '/tabs/money', icon: cash },
    { title: 'Home', path: '/tabs/home', icon: home },
    { title: 'About', path: '/tabs/about', icon: informationCircle }
  ],
  loggedInPages: [
    { title: 'Account', path: '/account', icon: person },
    { title: 'Support', path: '/support', icon: help },
    { title: 'Logout', path: '/logout', icon: logOut }
  ],
  loggedOutPages: [
    { title: 'Login', path: '/login', icon: logIn },
    { title: 'Support', path: '/support', icon: help },
    { title: 'Signup', path: '/signup', icon: personAdd }
  ]
};

interface Pages {
  title: string,
  path: string,
  icon: string,
  routerDirection?: string
}
interface StateProps {
  darkMode: boolean;
  isAuthenticated: boolean;
  menuEnabled: boolean;
}

interface DispatchProps {
  setDarkMode: typeof setDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { }

const Menu: React.FC<MenuProps> = ({ darkMode, history, isAuthenticated, setDarkMode, menuEnabled }) => {
  const location = useLocation();

  function renderlistItems(list: Pages[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem detail={false} routerLink={p.path} routerDirection="none" className={location.pathname.startsWith(p.path) ? 'selected' : undefined}>
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu type="overlay" disabled={!menuEnabled} contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>TODO 1</IonListHeader>
          {renderlistItems(routes.appPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Account</IonListHeader>
          {isAuthenticated ? renderlistItems(routes.loggedInPages) : renderlistItems(routes.loggedOutPages)}
          <IonItem>
            <IonIcon slot="start" icon={moonOutline}></IonIcon>
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
          </IonItem>
        </IonList>
        <IonList lines="none">
          <IonListHeader>Intro</IonListHeader>
          <IonItem button onClick={() => {
            history.push('/intro');
          }}>
            <IonIcon slot="start" icon={hammer} />
            Show Intro
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isAuthenticated: state.user.isLoggedin,
    menuEnabled: state.data.menuEnabled
  }),
  mapDispatchToProps: ({
    setDarkMode
  }),
  component: withRouter(Menu)
})