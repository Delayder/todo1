import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { IonButton, IonButtons, IonHeader, IonMenu, IonToolbar } from '@ionic/react';

import { connect } from '../../../data/connect';
import { setHasSeenIntro } from '../../../data/user/user.actions';

import './Menu.css';
import { setMenuEnabled } from '../../../data/sessions/sessions.actions';
import DarkMode from '../../buttons/DarkMode';

interface StateProps {
  darkMode: boolean;
}

interface MenuProps extends RouteComponentProps, StateProps { }

const Menu: React.FC<MenuProps> = ({ darkMode, history }) => {

  const [showSkip, setShowSkip] = useState(true);
  const startApp = async () => {
    await setHasSeenIntro(true);
    await setMenuEnabled(true);
    history.push('/login', { direction: 'none' });
  };

  return (
    <IonMenu type="overlay" contentId="main">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="start">
            {showSkip && <IonButton color='primary' onClick={startApp}>Omitir</IonButton>}
          </IonButtons>
          <DarkMode slot="end"></DarkMode>
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
  component: withRouter(Menu)
})
