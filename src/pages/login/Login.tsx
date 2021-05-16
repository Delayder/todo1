import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonItem, IonLabel, IonInput, IonText, useIonViewWillEnter, IonGrid } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../../data/user/user.actions';
import { connect } from '../../data/connect';
import { RouteComponentProps } from 'react-router';
import { setMenuEnabled } from '../../data/sessions/sessions.actions';

interface OwnProps extends RouteComponentProps { }

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
  setMenuEnabled: typeof setMenuEnabled;
}

interface LoginProps extends OwnProps, DispatchProps { }

const Login: React.FC<LoginProps> = ({ setIsLoggedIn, setMenuEnabled, history, setUsername: setUsernameAction }) => {

  useIonViewWillEnter(() => {
    setMenuEnabled(false);
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!username) {
      setUsernameError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    if (username && password) {
      await setIsLoggedIn(true);
      await setUsernameAction(username);
      history.push('/tabs/home', { direction: 'none' });
    }
  };

  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todo 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <form noValidate onSubmit={login}>
          <IonGrid>
            <IonRow className="ion-justify-content-center ion-align-items-center">
              <IonCol className="" size="12">
                <h2>LOGIN</h2>
              </IonCol>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked" color="medium">Username</IonLabel>
                  <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                    required>
                  </IonInput>
                </IonItem>
                {formSubmitted && usernameError && <IonText color="danger">
                  <p className="ion-padding-start">
                    Username is required
              </p>
                </IonText>}
              </IonCol>

              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked" color="medium">Password</IonLabel>
                  <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
                  </IonInput>
                </IonItem>
                {formSubmitted && passwordError && <IonText color="danger">
                  <p className="ion-padding-start">
                    Password is required
              </p>
                </IonText>}
              </IonCol>

            </IonRow>


            <IonRow>
              <IonCol>
                <IonButton type="submit" expand="block">Login</IonButton>
              </IonCol>
              <IonCol>
                <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </form>

      </IonContent>

    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername,
    setMenuEnabled
  },
  component: Login
})

