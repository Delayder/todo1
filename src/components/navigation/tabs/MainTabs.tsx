import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { informationCircle, home, paperPlane } from 'ionicons/icons';
import About from './about/About';
import SendMoney from './sendMoney/SendMoney';
import Home from './home/Home';
interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/home" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/sendMoney" render={() => <SendMoney />} exact={true} />
        <Route path="/tabs/home" render={() => <Home />} exact={true} />
        <Route path="/tabs/about" render={() => <About />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="sendMoney" href="/tabs/sendMoney">
          <IonIcon icon={paperPlane} />

        </IonTabButton>
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={home} />

        </IonTabButton>
        <IonTabButton tab="about" href="/tabs/about">
          <IonIcon icon={informationCircle} />

        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
