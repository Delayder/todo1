import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonDatetime, IonSelectOption, IonList, IonItem, IonLabel, IonSelect, IonPopover } from '@ionic/react';
import './About.scss';

interface AboutProps { }

const About: React.FC<AboutProps> = () => {


  const [location, setLocation] = useState<'madison' | 'austin' | 'chicago' | 'seattle'>('madison');
  const [aboutDate, setaboutDate] = useState('2020-05-17T00:00:00-05:00');

  const selectOptions = {
    header: 'Selecciona una sucursal'
  };

  // momentjs would be a better way to do this https://momentjs.com/
  function displayDate(date: string, format: string) {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

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
    <IonPage id="about-page">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="about-header">
          {/* Instead of loading an image each time the select changes, use opacity to transition them */}
          <div className="about-image madison" style={{ 'opacity': location === 'madison' ? '1' : undefined }}></div>
          <div className="about-image austin" style={{ 'opacity': location === 'austin' ? '1' : undefined }}></div>
          <div className="about-image chicago" style={{ 'opacity': location === 'chicago' ? '1' : undefined }}></div>
          <div className="about-image seattle" style={{ 'opacity': location === 'seattle' ? '1' : undefined }}></div>
        </div>
        <div className="about-info">
          <h3 className="ion-padding-top ion-padding-start">Sobre Nosotros</h3>

          <p className="ion-padding-start ion-padding-end">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime expedita ut iusto, dicta fugit libero autem, id incidunt quasi harum nulla consequatur. Iste nostrum accusantium hic et ipsa laboriosam fuga.
          </p>

          <h3 className="ion-padding-top ion-padding-start">Detalles</h3>

          <IonList lines="none">
            <IonItem>
              <IonLabel>
                Localidades
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
                Fecha
              </IonLabel>
              <IonDatetime
                displayFormat="MMM DD, YYYY"
                max="2056"
                value={aboutDate}
                onIonChange={(e) => setaboutDate(e.detail.value as any)}>
              </IonDatetime>
            </IonItem>
          </IonList>

        </div>
      </IonContent>

    </IonPage>
  );
};

export default React.memo(About);
