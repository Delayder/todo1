import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonDatetime, IonSelectOption, IonList, IonItem, IonLabel, IonSelect, IonPopover } from '@ionic/react';
import './SendMoney.scss';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';

interface SendMoneyProps { }

const SendMoney: React.FC<SendMoneyProps> = () => {

  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState();
  const [location, setLocation] = useState<'madison' | 'austin' | 'chicago' | 'seattle'>('madison');
  const [conferenceDate, setConferenceDate] = useState('2047-05-17T00:00:00-05:00');

  const selectOptions = {
    header: 'Select a Location'
  };

  const presentPopover = (e: React.MouseEvent) => {
    setShowPopover(true);
  };

  // momentjs would be a better way to do this https://momentjs.com/
  function displayDate(date: string, format: string) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const d = new Date(date);
    const year = d.getFullYear();

    if (format === 'y') {
      return year;
    } else {
      const month = monthNames[d.getMonth()];
      const day = d.getDate();

      return month + ' ' + day + ', ' + year;
    }
  }

  return (
    <IonPage id="SendMoney-page">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={presentPopover}>
                <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <div className="SendMoney-info">
          <h3 className="ion-padding-top ion-padding-start">SendMoney</h3>

          <p className="ion-padding-start ion-padding-end">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime expedita ut iusto, dicta fugit libero autem, id incidunt quasi harum nulla consequatur. Iste nostrum accusantium hic et ipsa laboriosam fuga.
          </p>

          <h3 className="ion-padding-top ion-padding-start">Details</h3>

          <IonList lines="none">
            <IonItem>
              <IonLabel>
                Location
              </IonLabel>
              <IonSelect value={location} interfaceOptions={selectOptions} onIonChange={(e) => setLocation(e.detail.value as any)}>
                <IonSelectOption value="madison">Madison, WI</IonSelectOption>
                <IonSelectOption value="austin">Austin, TX</IonSelectOption>
                <IonSelectOption value="chicago">Chicago, IL</IonSelectOption>
                <IonSelectOption value="seattle">Seattle, WA</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>
                Date
              </IonLabel>
              <IonDatetime
                displayFormat="MMM DD, YYYY"
                max="2056"
                value={conferenceDate}
                onIonChange={(e) => setConferenceDate(e.detail.value as any)}>
              </IonDatetime>
            </IonItem>
          </IonList>

          <h3 className="ion-padding-top ion-padding-start">Internet</h3>

          <IonList lines="none">
            <IonItem>
              <IonLabel>
                Wifi network
              </IonLabel>
              <IonLabel className="ion-text-end">
                ica{ displayDate(conferenceDate, 'y') }
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
               Password
              </IonLabel>
              <IonLabel className="ion-text-end">
                makegoodthings
              </IonLabel>
            </IonItem>
          </IonList>

        </div>
      </IonContent>

      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
      </IonPopover>
    </IonPage>
  );
};

export default React.memo(SendMoney);
