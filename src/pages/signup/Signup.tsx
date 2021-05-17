import React, { useState } from 'react';
import { IonContent, IonPage, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, useIonAlert, IonGrid } from '@ionic/react';
import { setIsLoggedIn, setUsername } from '../../data/user/user.actions';
import { connect } from '../../data/connect';
import { RouteComponentProps } from 'react-router';
import DarkMode from '../../components/buttons/DarkMode';
import "../login/Login.scss";


interface OwnProps extends RouteComponentProps { }

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface LoginProps extends OwnProps, DispatchProps { }

const Login: React.FC<LoginProps> = ({ setIsLoggedIn, history, setUsername: setUsernameAction }) => {
  const [present] = useIonAlert();

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
    const data = {
      name: {
        firstName: "Juano",
        lastName: "Martinez"
      },
      username,
      password
    }
    fetch(`${URL}/api/auth/user`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      console.log(res)
      if (username && password) {
        setIsLoggedIn(true);
        setUsernameAction(username);
        history.push('/tabs/home', { direction: 'none' });
      }
    }).catch((err) => {
      present({
        cssClass: 'my-css',
        header: 'Alert',
        message: err.message,
        buttons: [
          'Cancel',
          { text: 'Ok', handler: (d) => console.log('ok pressed') },
        ],
        onDidDismiss: (e) => console.log('did dismiss'),
      })

      console.log("ERROR", err)
    })

    if (username && password) {
      await setIsLoggedIn(true);
      await setUsernameAction(username);
      history.push('/tabs/home', { direction: 'none' });
    }
  };

  return (
    <IonPage id="signup-page">
      <IonContent>
        <form noValidate onSubmit={login}>
          <div className="container__head">
            <h3>Todo1</h3>
            <DarkMode slot="end"></DarkMode>
          </div>

          <IonGrid>
            <IonRow className="ion-justify-content-center ion-align-items-center ion-margin-top">
            <h1>Crear cuenta</h1>
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked" color="secondary">Username</IonLabel>
                  <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => {
                    setUsername(e.detail.value!);
                    setUsernameError(false);
                  }}
                    required>
                  </IonInput>
                </IonItem>
              </IonCol>

              {formSubmitted && usernameError && <IonText color="danger">
                <p className="ion-padding-start">
                  Username is required
              </p>
              </IonText>}
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="stacked" color="secondary">Password</IonLabel>
                  <IonInput name="password" type="password" value={password} onIonChange={e => {
                    setPassword(e.detail.value!);
                    setPasswordError(false);
                  }}>
                  </IonInput>
                </IonItem>

                {formSubmitted && passwordError && <IonText color="danger">
                  <p className="ion-padding-start">
                    Password is required
              </p>
                </IonText>}
              </IonCol>
            </IonRow>

            <IonButton type="submit" color="secondary" expand="block">Crear Cuenta</IonButton>
            <IonButton routerLink="/login" color="secondary" className="ion-margin-top" fill="clear" expand="block">Regresar</IonButton>
          </IonGrid>
        </form>

      </IonContent>

    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername
  },
  component: Login
})
