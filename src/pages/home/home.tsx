import React from 'react';
import { connect } from '../../data/connect';
import { Redirect } from 'react-router';

interface StateProps {
  hasSeenIntro: boolean;
}

const Home: React.FC<StateProps> = ({ hasSeenIntro }) => {
  return hasSeenIntro ? <Redirect to="/tabs/home" /> : <Redirect to="/intro" />
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    hasSeenIntro: state.user.hasSeenIntro
  }),
  component: Home
});
