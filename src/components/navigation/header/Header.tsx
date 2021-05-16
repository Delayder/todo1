import React, { useState } from 'react';
import { RouteComponentProps, withRouter, useLocation } from 'react-router';

import { IonButton, IonButtons, IonHeader, IonIcon, IonMenu, IonToolbar } from '@ionic/react';
import { moonOutline } from 'ionicons/icons';

import { connect } from '../../../data/connect';
import { setDarkMode, setHasSeenIntro } from '../../../data/user/user.actions';

import './Menu.css';
import { setMenuEnabled } from '../../../data/sessions/sessions.actions';

interface StateProps {
  darkMode: boolean;
}


interface DispatchProps {
  setDarkMode: typeof setDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { }

const Menu: React.FC<MenuProps> = ({ darkMode, history, setDarkMode }) => {

  const [showSkip, setShowSkip] = useState(true);
  const startApp = async () => {
    await setHasSeenIntro(true);
    await setMenuEnabled(true);
    history.push('/login', { direction: 'none' });
  };
  const location = useLocation();

  return (
    <IonMenu type="overlay" contentId="main">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="start">
            {showSkip && <IonButton color='primary' onClick={startApp}>Omitir</IonButton>}
          </IonButtons>
          <IonButtons slot="end">
            <IonIcon slot="start" icon={moonOutline} onClick={() => setDarkMode(!darkMode)}></IonIcon>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
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
