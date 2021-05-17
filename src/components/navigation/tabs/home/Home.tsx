import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import { QRScanner } from '@ionic-native/qr-scanner';

import { connect } from '../../../../data/connect';
import { authFetch } from '../../../../data/helper/user.auth';

import "./Home.scss";
import { bagHandleOutline, cashOutline, helpCircle, walletOutline } from 'ionicons/icons';

interface DarkModeButtonOptions extends RouteComponentProps { };

const Home: React.FC<DarkModeButtonOptions> = ({ history }) => {
  const [account, setAccount] = useState([]);
  const [QRvalue, setQRvalue] = useState('');

  useEffect(() => {
    authFetch('').then(r => r.json()).then(_post => setAccount(_post));
  });

  const generateQR = () =>{

  }
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>HOME</IonTitle>
          <IonButton color="transparent" fill="clear" slot="end" onClick={() => {
            history.push('/intro');
          }}>
            <IonIcon slot="start" icon={helpCircle} ></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="dotted"></div>
        <IonCard>
          <IonCardHeader className="ion-text-center">
            <img src="assets/img/qrcode.webp" width="100"></img>
            <IonCardTitle className="ion-margin-top">Paga Con QR!</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked" color="medium">Monto</IonLabel>
              <IonInput name="QRvalue" type="text" value={QRvalue} spellCheck={false} autocapitalize="off" onIonChange={e => setQRvalue(e.detail.value!)}
                required>
                <IonIcon inputMode="numeric" icon={walletOutline}></IonIcon>
              </IonInput>
            </IonItem>
            <IonButton type="submit" expand="block" shape="round" className="ion-margin-top" color="primary" onClick={() => {generateQR()}}>Generar Codigo QR</IonButton>
          </IonCardContent>
        </IonCard>

        <IonRow>
          <IonCol className="ion-padding-start" size="12">
            <h2>Mis cuentas</h2>
          </IonCol>
          <IonCol size="6" sizeXs="12">
            <IonCard >
              <IonCardContent className="card-dot">
                <IonRow className="ion-align-items-center ">
                  <IonCol size="7">
                    <IonCardSubtitle color="medium">Ahorros</IonCardSubtitle>
                    <p>
                      <strong>$0.00</strong> COL
                    </p>
                  </IonCol>
                  <IonCol size="5">
                    <span>
                      <IonIcon slot="start" color="dark" className="ion-padding-right" icon={cashOutline} />
                    </span>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="6" sizeXs="12">
            <IonCard >
              <IonCardContent className="card-dot">
                <IonRow className="ion-align-items-center ">
                  <IonCol size="7">
                    <IonCardSubtitle color="medium">Corriente</IonCardSubtitle>
                    <p>
                      <strong>$0.00</strong> COL
                </p>
                  </IonCol>
                  <IonCol size="5">
                    <span>
                      <IonIcon slot="start" color="dark" className="ion-padding-right" icon={bagHandleOutline} />
                    </span>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>

      </IonContent>
    </IonPage>
  )
}

export default connect<{}>({
  component: withRouter(Home)
});
