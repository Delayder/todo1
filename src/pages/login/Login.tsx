import React, { useState } from 'react';
import { IonContent, IonPage, IonRow, IonCol, IonButton, IonItem, IonLabel, IonInput, IonText, useIonViewWillEnter, IonGrid, useIonAlert } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../../data/user/user.actions';
import { connect } from '../../data/connect';
import { RouteComponentProps } from 'react-router';
import { setMenuEnabled } from '../../data/sessions/sessions.actions';
import DarkMode from '../../components/buttons/DarkMode';
import { config } from '../../config';
import { createTokenProvider } from '../../data/helper/user.token';
interface OwnProps extends RouteComponentProps { }

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
  setMenuEnabled: typeof setMenuEnabled;
}

interface LoginProps extends OwnProps, DispatchProps { }

const Login: React.FC<LoginProps> = ({ setIsLoggedIn, setMenuEnabled, history, setUsername: setUsernameAction }) => {
  const [present] = useIonAlert();
  const tokenProvider = createTokenProvider();

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
    const URL = "http://localhost:7002";
    const data = { username, password };
    fetch(`${URL}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(async res => {
      const { token, message } = await res.json();
      if (token) {
        setUsernameAction(username);
        setIsLoggedIn(true);
        setMenuEnabled(true);
        tokenProvider.setToken(token);
        history.push('/tabs/home', { direction: 'none' });
      } else {
        present({
          cssClass: 'my-css',
          header: 'Error de inicio de sesión',
          message: message,
          buttons: [
            'Ok'
          ],
        })

      }
    })
  };

  return (
    <IonPage id="login-page">

      <IonContent fullscreen>
        <form noValidate onSubmit={login}>

          <div className="container__head">
            <h2>TODO1</h2>
            <DarkMode slot="end"></DarkMode>
          </div>

          <IonGrid>
            <IonRow className="ion-justify-content-center ion-align-items-center ion-margin-top">
              <h1>INICIO SESIÓN</h1>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="floating" color="medium">Alias</IonLabel>
                  <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                    required>
                  </IonInput>
                </IonItem>
                {formSubmitted && usernameError && <IonText color="danger">
                  <p className="ion-padding-start">
                    El Alias es requerido
              </p>
                </IonText>}
              </IonCol>

              <IonCol size="12">
                <IonItem>
                  <IonLabel position="floating" color="medium">Contraseña</IonLabel>
                  <IonInput name="password" color="primary" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
                  </IonInput>
                </IonItem>
                {formSubmitted && passwordError && <IonText color="danger">
                  <p className="ion-padding-start">
                    La contraseña es requerida
              </p>
                </IonText>
                }
              </IonCol>

            </IonRow>
            <IonButton type="submit" expand="block" shape="round" color="primary">Iniciar Sesión</IonButton>
            <IonButton routerLink="/signup" color="transparent" className="ion-margin-top" fill="clear" expand="block">Crea tu cuenta!</IonButton>
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

