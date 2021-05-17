import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton } from '@ionic/react';

import './SendMoney.scss';
interface SendMoneyProps { }

const SendMoney: React.FC<SendMoneyProps> = () => {

  return (
    <IonPage id="SendMoney-page">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="SendMoney-info">
          <h3 className="ion-padding-top ion-padding-start">SendMoney</h3>

          <p className="ion-padding-start ion-padding-end">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime expedita ut iusto, dicta fugit libero autem, id incidunt quasi harum nulla consequatur. Iste nostrum accusantium hic et ipsa laboriosam fuga.
          </p>

        </div>
      </IonContent>

    </IonPage>
  );
};

export default React.memo(SendMoney);
