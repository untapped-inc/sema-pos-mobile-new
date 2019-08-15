import React from 'react';
import { Appbar } from 'react-native-paper';
import Constants from 'expo-constants';

const envVar = process.env.NODE_ENV || 'development';

const serviceURL = envVar === 'development'
  ? `http://${Constants.manifest.debuggerHost.split(':').shift()}:3001/api/v1`
  : Constants.manifest.extra.semaServiceUrl;

export default class AuthHeader extends React.PureComponent {
  render() {
    return (
      <Appbar.Header>
        <Appbar.Content
          title={`SEMA v${Constants.manifest.version}`}
          subtitle={`Service URL: ${serviceURL}`}
        />
      </Appbar.Header>
    );
  }
}
