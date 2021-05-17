import React, { useState } from 'react';
import { IonContent, IonPage, IonRow, IonCol, IonButton, IonItem, IonLabel, IonInput, IonText, useIonAlert, IonGrid } from '@ionic/react';
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

const Login: React.FC<LoginProps> = ({  history, setUsername: setUsernameAction }) => {
  const [present] = useIonAlert();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const resetForm = () =>{
    setUsername('');
    setPassword('');
  }

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!username) {
      setUsernameError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    const data = {
      name: {
        firstName: "Juano",
        lastName: "Martinez"
      },
      nickname: "Account" + Math.floor(Math.random() * 10),
      username,
      password
    }
    fetch(`${process.env.REACT_APP_API_URL}/api/auth/user`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(async (res) => {
      const { user, message } = await res.json();
      if (user.status && user.status === 200) {
        present({
          animated: true,
          header: 'Cuenta Creada!',
          message: user.message,
          buttons: [
            'Ok'
          ],
        })
        history.push('/login', { direction: 'none' });
      } else {
        present({
          animated: true,
          header: 'Uy, Hubo un error!',
          message: message,
          buttons: [
            'Ok'
          ],
        })
      }
    })
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
                  <IonLabel position="floating" color="medium">ALIAS</IonLabel>
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
                  Se requiere un Alias
              </p>
              </IonText>}
              <IonCol size="12">
                <IonItem>
                  <IonLabel position="floating" color="medium">CONTRASEÑA</IonLabel>
                  <IonInput name="password" type="password" color="secondary" value={password} onIonChange={e => {
                    setPassword(e.detail.value!);
                    setPasswordError(false);
                  }}>
                  </IonInput>
                </IonItem>

                {formSubmitted && passwordError && <IonText color="danger">
                  <p className="ion-padding-start">
                    La contraseña es requerida
              </p>
                </IonText>}
              </IonCol>
            </IonRow>

            <IonButton type="submit" onClick={() => { resetForm() }} color="secondary" expand="block">Crear Cuenta</IonButton>
            <IonButton routerLink="/login" onClick={() => { resetForm() }} color="secondary" className="ion-margin-top" fill="clear" expand="block">Regresar</IonButton>
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
