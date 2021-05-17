import React, { useEffect, useState } from 'react';
import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';

import { connect } from '../../../../data/connect';
import "./Home.scss";
import { bagHandleOutline, cashOutline, helpCircle, walletOutline } from 'ionicons/icons';
import { parseJwt } from '../../../../data/helper/auth.helper';

import axios from "axios";
interface DarkModeButtonOptions extends RouteComponentProps { };

const Home: React.FC<DarkModeButtonOptions> = ({ history }) => {
  const [account, setAccount]: any = useState([]);
  const [currency, setCurrency]: any = useState('');
  const [money, setMoney]: any = useState('');
  const [QRvalue, setQRvalue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const URL = "http://localhost:7002";
  const token = localStorage.getItem("_cap_TOKEN_AUTH");
  const decodedToken = parseJwt(token);

  useEffect(() => {
    const getAccount = async () => {
      const res = await axios({
        method: 'GET',
        url: `${URL}/api/userAccount/checking/${decodedToken._id}`,
        headers: { "Content-Type": "application/json", "Authorization": JSON.parse(token || "") },
      });
      const data = res;
      setAccount(data.data);
      const { currency, balance } = data.data.money;
      setMoney(balance);
      setCurrency(currency);
    }
    getAccount();

  }, [!account.money]);

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
            <IonButton type="submit" expand="block" shape="round" className="ion-margin-top" color="primary" onClick={() => { }}>Generar Codigo QR</IonButton>
          </IonCardContent>
        </IonCard>

        <IonRow>
          <IonCol className="ion-padding-start" size="12">
            <h2>Mis cuentas</h2>
            <IonButton className="ion-margin-top" color="secondary" fill="outline" onClick={() => setShowModal(true)}>{account.nickname}</IonButton>
            <IonModal isOpen={showModal} cssClass='my-custom-class'>
              <IonHeader translucent>
                <IonToolbar color="primary">
                  <IonTitle color="dark">Tu cuenta {account.nickname}</IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={() => setShowModal(false)} color="dark" fill="outline" shape="round">Close</IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent fullscreen>
                <div className="ball"></div>
                <IonList>
                  <IonItem>
                    <IonAvatar slot="start">
                      <IonImg src="assets/img/speakers/puppy.jpg" />
                    </IonAvatar>
                    <IonLabel color="dark">
                      <h2>Número: <strong>{account.accountNumber}</strong></h2>
                      <p>CC: <strong>{account.userCredential}</strong></p>
                      <p>Tipo: <strong>{account.accountType === 1 ? 'Ahorros' : 'Corriente'}</strong></p>
                      <p>Banco: <strong>{account.entity}</strong></p>
                      <IonCardSubtitle color="secondary">Creada: {account.createdAt}</IonCardSubtitle>
                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonContent>
            </IonModal>
          </IonCol>
          <IonCol size="6" sizeXs="12">
            <IonCard className="ion-margin-top" disabled={account.accountType !== 1 ? true : false}>
              <IonCardContent className="card-dot card-dot__credit">
                <IonRow className="ion-align-items-center ">
                  <IonCol size="7">
                    <IonCardSubtitle color="medium">Ahorros</IonCardSubtitle>
                    <p>
                      <strong>${money}</strong> {currency}
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
            <IonCard disabled={account.accountType !== 2 ? true : false}>
              <IonCardContent className="card-dot card-dot__secondary">
                <IonRow className="ion-align-items-center ">
                  <IonCol size="7">
                    <IonCardSubtitle color="medium">Corriente</IonCardSubtitle>
                    <p>
                      <strong>${money}</strong> {currency}
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
