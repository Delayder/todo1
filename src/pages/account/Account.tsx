import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList, IonItem, IonAlert } from '@ionic/react';
import './Account.scss';
import { setUsername } from '../../data/user/user.actions';
import { connect } from '../../data/connect';
import { RouteComponentProps } from 'react-router';
import { logout } from '../../data/helper/user.auth';

interface OwnProps extends RouteComponentProps { }

interface StateProps {
  username?: string;
}

interface DispatchProps {
  setUsername: typeof setUsername;
}

interface AccountProps extends OwnProps, StateProps, DispatchProps { }

const Account: React.FC<AccountProps> = ({ setUsername, username }) => {

  const [showAlert, setShowAlert] = useState(false);

  return (
    <IonPage id="account-page">
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Configurar Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {username &&
          (<div className="ion-padding-top ion-text-center">
            {/*<img src="https://www.gravatar.com/avatar?d=mm&s=140" alt="avatar" />*/}
            <img src="assets/img/speakers/puppy.jpg" alt="puppy" />
            <h2>{username}</h2>
            <IonList inset>
              <IonItem button>Update Picture</IonItem>
              <IonItem button onClick={() => setShowAlert(true)}>Change Username</IonItem>
              <IonItem button>Change Password</IonItem>
              <IonItem button onClick={() => logout()} routerLink="/login" routerDirection="none">Logout</IonItem>
            </IonList>
          </div>)
        }
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        header="Change Username"
        buttons={[
          'Cancel',
          {
            text: 'Ok',
            handler: (data) => {
              setUsername(data.username);
            }
          }
        ]}
        inputs={[
          {
            type: 'text',
            name: 'username',
            value: username,
            placeholder: 'username'
          }
        ]}
        onDidDismiss={() => setShowAlert(false)}
      />
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    username: state.user.username
  }),
  mapDispatchToProps: {
    setUsername,
  },
  component: Account
})
