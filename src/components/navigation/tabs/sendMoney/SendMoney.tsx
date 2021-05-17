import React, { useRef, useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonTitle, IonCard, IonCardHeader, IonCardContent, IonSlides, IonSlide, IonList, IonItem, IonIcon, IonLabel } from '@ionic/react';

import './SendMoney.scss';
import { book, cash, paperPlane } from 'ionicons/icons';
interface SendMoneyProps { }

const SendMoney: React.FC<SendMoneyProps> = () => {
  const [showSkip, setShowSkip] = useState(true);
  const slideRef = useRef<HTMLIonSlidesElement>(null);

  const slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  const handleSlideChangeStart = () => {
    slideRef.current!.isEnd().then(isEnd => setShowSkip(!isEnd));
  };

  return (
    <IonPage id="sendMoney">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar color="tertiary">
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle color="light">ENVIAR DINERO</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="sendMoney-info ">
          <div className="ion-padding-start">
            <h3 className="my-balance">0.00$</h3>
            <label className="my-balance__text">Your Balance</label>
          </div>
          <IonCard className="balance-card ion-padding-top">

              <IonSlides ref={slideRef} onIonSlideWillChange={handleSlideChangeStart} pager={false}>
                <IonSlide>
                  <img src="assets/img/ica-slidebox-img-1.png" alt="" className="slide-image" />
                  <h2 className="slide-title">
                    Lorem, ipsum dolor.
    </h2>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis.
    </p>
                </IonSlide>

                <IonSlide>
                  <img src="assets/img/ica-slidebox-img-2.png" alt="" className="slide-image" />
                  <h2 className="slide-title">Lorem ipsum dolor sit amet.</h2>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, veniam!
    </p>
                </IonSlide>

                <IonSlide>
                  <img src="assets/img/ica-slidebox-img-3.png" alt="" className="slide-image" />
                  <h2 className="slide-title">Lorem ipsum dolor sit amet consectetur.</h2>
                  <p>
                    <b>Lorem, ipsum.</b>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    </p>
                </IonSlide>

                <IonSlide>
                  <img src="assets/img/ica-slidebox-img-4.png" alt="" className="slide-image" />
                  <h2 className="slide-title">¿Lorem?</h2>
                </IonSlide>
              </IonSlides>

            <IonCardContent>
              <IonTitle color="secondary" className="myCard">Card Info</IonTitle>
              <IonList >
                <IonItem color="tertiary" className="styled--item" button>
                  <IonIcon slot="start" icon={paperPlane}></IonIcon>
                  <IonLabel>Tarjetas de Negocios</IonLabel>
                </IonItem>
                <IonItem color="tertiary" className="styled--item" button>
                  <IonIcon slot="start" icon={cash}></IonIcon>
                  <IonLabel>Pagos En linea</IonLabel>
                </IonItem>
                <IonItem color="tertiary" className="styled--item" button>
                  <IonIcon slot="start" icon={book}></IonIcon>
                  <IonLabel>Historial de transacciones recientes</IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>

    </IonPage>
  );
};

export default React.memo(SendMoney);
