import { IonButton,  IonIcon } from '@ionic/react';
import { moonOutline } from 'ionicons/icons';
import React from 'react';

import './DarkMode.scss';
import { connect } from '../../data/connect';
import { setDarkMode } from "../../data/user/user.actions";

interface props {
  slot: string
}

interface OwnProps extends props { };

interface DispatchProps {
  setDarkMode: typeof setDarkMode;
}
interface StateProps {
  darkMode: boolean;
}

interface DarkModeButtonOptions extends OwnProps, DispatchProps, StateProps { };

const DarkMode: React.FC<DarkModeButtonOptions> = ({ setDarkMode, darkMode, slot }) => {
  return (
    <IonButton color="dark" size="small" shape="round" fill="clear" expand="full" slot={slot} onClick={() => setDarkMode(!darkMode)}>
        <IonIcon slot="start" icon={moonOutline} ></IonIcon>
    </IonButton>
  )
}

export default connect<OwnProps, {}, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode
  }),
  mapDispatchToProps: ({
    setDarkMode
  }),
  component: DarkMode
});
