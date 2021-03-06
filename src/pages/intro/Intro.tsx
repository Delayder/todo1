import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonSlides, IonSlide, IonIcon, useIonViewWillEnter } from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import { setMenuEnabled } from '../../data/sessions/sessions.actions';
import { setHasSeenIntro } from '../../data/user/user.actions';
import './Intro.scss';
import { connect } from '../../data/connect';
import { RouteComponentProps } from 'react-router';
import DarkMode from '../../components/buttons/DarkMode';

interface OwnProps extends RouteComponentProps { };

interface DispatchProps {
  setHasSeenIntro: typeof setHasSeenIntro;
  setMenuEnabled: typeof setMenuEnabled;
}
interface StateProps {
  hasSeenIntro: boolean;
}

interface IntroProps extends OwnProps, DispatchProps, StateProps { };

const Intro: React.FC<IntroProps> = ({ history, hasSeenIntro, setHasSeenIntro, setMenuEnabled }) => {
  const [showSkip, setShowSkip] = useState(true);
  const slideRef = useRef<HTMLIonSlidesElement>(null);

  useIonViewWillEnter(() => {
    setMenuEnabled(false);
  });

  const startApp = async () => {
    if (hasSeenIntro) {
      history.push('/tabs/home', { direction: 'none' })
    }
    else {
      history.push('/login', { direction: 'none' });
    }
    await setHasSeenIntro(true);
    await setMenuEnabled(true);
  };

  const handleSlideChangeStart = () => {
    slideRef.current!.isEnd().then(isEnd => setShowSkip(!isEnd));
  };

  return (
    <IonPage id="intro-page">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="start">
            {showSkip && <IonButton color='secondary' onClick={startApp}>Omitir</IonButton>}
          </IonButtons>
          <DarkMode slot="end"></DarkMode>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonSlides ref={slideRef} onIonSlideWillChange={handleSlideChangeStart} pager={false}>
          <IonSlide>
            <img src="assets/img/ica-slidebox-img-1.png" alt="" className="slide-image" />
            <h2 className="slide-title">
              !Bienvenido a TODO1!
            </h2>
            <p>
              Somos una <b>app para bancos</b> practica y eficiente para ver tu cuenta de ahorros y corriente.
            </p>
          </IonSlide>

          <IonSlide>
            <img src="assets/img/ica-slidebox-img-2.png" alt="" className="slide-image" />
            <h2 className="slide-title">Una experiencia reconfortable</h2>
            <p>
              <b>Somos</b> un equipo muy comprometido con nuestros clientes!
            </p>
          </IonSlide>

          <IonSlide>
            <img src="assets/img/ica-slidebox-img-3.png" alt="" className="slide-image" />
            <h2 className="slide-title">Tu experiencia Esta por comenzar!</h2>
            <p>
              <b>La confortabilidad</b> de gestionar tu cuenta desde casa, esta por iniciar!.
            </p>
          </IonSlide>

          <IonSlide>
            <img src="assets/img/ica-slidebox-img-4.png" alt="" className="slide-image" />
            <h2 className="slide-title">??Listo?</h2>
            <IonButton fill="clear" onClick={startApp}>
              Continuar
              <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapStateToProps: (state) => ({
    hasSeenIntro: state.user.hasSeenIntro
  }),
  mapDispatchToProps: ({
    setHasSeenIntro,
    setMenuEnabled
  }),
  component: Intro
});
