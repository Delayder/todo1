import React, { useEffect, useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { connect } from '../../data/connect';
import { authFetch } from '../../data/helper/user.auth';

interface DarkModeButtonOptions { };

const Homes: React.FC<DarkModeButtonOptions> = () => {
  const [account, setAccount] = useState([]);

  useEffect(() => {
    authFetch('').then(r => r.json()).then(_post => setAccount(_post));
  })
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>HOME</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonTitle>{account}</IonTitle>
      </IonContent>
    </IonPage>
  )
}

export default connect<{}>({
  component: Homes
});
