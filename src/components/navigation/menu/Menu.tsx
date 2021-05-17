import React from 'react';
import { RouteComponentProps, withRouter, useLocation } from 'react-router';

import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonToggle } from '@ionic/react';
import { logOut, moonOutline } from 'ionicons/icons';

import { connect } from '../../../data/connect';
import { setDarkMode } from '../../../data/user/user.actions';

import './Menu.scss';
import routes from '../../../routes';
import { logout } from '../../../data/helper/user.auth';
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

const Menu: React.FC<MenuProps> = ({ darkMode, isAuthenticated, setDarkMode, menuEnabled }) => {
  const location = useLocation();

  function renderlistItems(list: Pages[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem detail={false} routerLink={p.path} routerDirection="none" className={`ion-margin-left ion-margin-top ${location.pathname.startsWith(p.path) ? 'selected' : undefined}`}>
            <IonIcon slot="start" className="ion-padding-right" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu type="overlay" disabled={!menuEnabled} contentId="main">
      {isAuthenticated && <>
        <IonContent forceOverscroll={false}>
          <IonList lines="none">
            <IonListHeader>TODO1</IonListHeader>
            {renderlistItems(routes.appPages)}
          </IonList>
          <IonList lines="none">
            <IonListHeader>Account</IonListHeader>
            {renderlistItems(routes.loggedInPages)}
            <IonItem onClick={() => logout()} routerLink="/login" className="ion-margin-top">
              <IonIcon slot="start" icon={logOut}></IonIcon>
              <IonLabel>Cerrar Sesión</IonLabel>
            </IonItem>
            <IonItem className="ion-margin-top">
              <IonIcon slot="start" icon={moonOutline}></IonIcon>
              <IonLabel>Modo Oscuro</IonLabel>
              <IonToggle checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
            </IonItem>
          </IonList>
        </IonContent>
      </>
      }
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
