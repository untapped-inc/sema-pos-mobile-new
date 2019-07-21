import React from 'react';
import { Appbar } from 'react-native-paper';
import Constants from 'expo-constants';

const envVar = process.env.NODE_ENV || 'development';

export default class AuthHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Appbar.Header>
        <Appbar.Content
          title={`SEMA v${Constants.manifest.version}`}
          subtitle={`Service URL: ${Constants.manifest.extra.semaServiceUrl[envVar]}`}
        />
      </Appbar.Header>
    );
  }
}